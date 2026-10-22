(() => {
  'use strict';
  const profile = window.PROFILE;
  const text = value => typeof value === 'string' ? value : (value?.en || '');
  const el = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; };
  function safeUrl(value) {
    if (!value) return null;
    try { const url = new URL(value, document.baseURI); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  function link(item, className = '') {
    const url = safeUrl(item.url); if (!url) return null;
    const anchor = el('a', className, text(item.label)); anchor.href = url; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; return anchor;
  }
  function icon(kind) {
    const ns = 'http://www.w3.org/2000/svg'; const svg = document.createElementNS(ns, 'svg');
    for (const [key, value] of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.5','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'})) svg.setAttribute(key, value);
    const path = document.createElementNS(ns, 'path');
    const paths = {
      slides: 'M3 4h18 M5 4v12h14V4 M12 16v5 M8 21l4-5 4 5 M8 8h8 M8 11h5',
      arxiv: 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z M14 3v5h5 M8.5 12h7 M8.5 15.5h7',
      mail: 'M3 5h18v14H3Z M3 5l9 7 9-7',
      copy: 'M9 5V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2 M4 8h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z',
      check: 'M5 12l4 4L19 6'
    };
    path.setAttribute('d', paths[kind]);
    svg.append(path); return svg;
  }
  document.documentElement.lang = 'en';
  document.title = `${profile.name} · Academic Homepage`;
  document.querySelectorAll('[data-name]').forEach(node => { node.textContent = profile.name; });
  document.querySelectorAll('[data-chinese-name]').forEach(node => { node.textContent = profile.chineseName || ''; });
  document.querySelectorAll('[data-profile]').forEach(node => { node.textContent = text(profile[node.dataset.profile]); });
  const bio = document.querySelector('[data-profile="bio"]');
  const bioText = text(profile.bio);
  const groupName = profile.theoryGroup?.label || 'Theory Group';
  const groupPosition = bioText.indexOf(groupName);
  if (groupPosition >= 0 && profile.theoryGroup?.url) {
    const groupLink = link(profile.theoryGroup);
    if (groupLink) bio.replaceChildren(document.createTextNode(bioText.slice(0, groupPosition)), groupLink, document.createTextNode(bioText.slice(groupPosition + groupName.length)));
  }
  if (profile.advisors?.length) {
    bio.append(document.createTextNode(' I am advised by '));
    profile.advisors.forEach((advisor, index) => {
      if (index) bio.append(document.createTextNode(' and '));
      const advisorLink = link({label: 'Prof. ' + advisor.name, url: advisor.url}, 'advisor-link');
      bio.append(advisorLink || document.createTextNode('Prof. ' + advisor.name));
    });
    bio.append(document.createTextNode('.'));
  }
  const email = document.getElementById('email-link'); email.textContent = profile.email; email.href = 'mailto:' + profile.email;
  document.querySelector('.email-icon').append(icon('mail'));
  const copyButton = document.getElementById('email-copy');
  const copyFeedback = copyButton.querySelector('.copy-feedback');
  const emailStatus = document.getElementById('email-status');
  copyButton.prepend(icon('copy'));
  if (navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    let resetCopyFeedback;
    copyButton.addEventListener('click', async () => {
      clearTimeout(resetCopyFeedback);
      try {
        await navigator.clipboard.writeText(profile.email);
        copyButton.querySelector('svg').replaceWith(icon('check'));
        copyButton.dataset.feedback = 'success';
        copyButton.setAttribute('aria-label', 'Email address copied');
        copyButton.title = 'Copied'; copyFeedback.textContent = 'Copied';
        emailStatus.textContent = 'Email address copied';
      } catch {
        emailStatus.textContent = 'Could not copy. Select the email address to copy it.';
        copyButton.querySelector('svg').replaceWith(icon('copy'));
        copyButton.setAttribute('aria-label', 'Copy email address'); copyButton.title = 'Copy email address';
        copyFeedback.textContent = 'Select to copy'; copyButton.dataset.feedback = 'error';
      }
      resetCopyFeedback = setTimeout(() => {
        copyButton.querySelector('svg').replaceWith(icon('copy'));
        delete copyButton.dataset.feedback; copyButton.setAttribute('aria-label', 'Copy email address');
        copyButton.title = 'Copy email address'; emailStatus.textContent = '';
      }, 1800);
    });
  }

  const education = document.getElementById('education-list'); education.replaceChildren();
  profile.education.forEach(item => {
    const row = el('article', 'education-item'); row.append(el('div', 'education-year', text(item.years)));
    const content = el('div', 'education-content'); content.append(el('h3', 'education-degree', text(item.degree)), el('p', 'education-institution', text(item.institution)));
    if (text(item.note)) content.append(el('p', 'education-note', text(item.note)));
    row.append(content); education.append(row);
  });
  const publications = document.getElementById('publication-list'); publications.replaceChildren();
  if (!profile.publications.length) publications.append(el('p', 'empty-publications', 'No publications listed yet.'));
  profile.publications.forEach(pub => {
    const row = el('article', 'publication'); row.append(el('div', 'pub-year', pub.year));
    const content = el('div', 'pub-content'); content.append(el('h3', 'pub-title', text(pub.title)));
    const authors = el('p', 'pub-authors'); text(pub.authors).split(profile.name).forEach((part, index) => { if (index) authors.append(el('strong', '', profile.name)); authors.append(document.createTextNode(part)); }); content.append(authors, el('p', 'pub-venue', text(pub.venue))); row.append(content);
    const resources = el('div', 'pub-resource-links');
    (pub.links || []).forEach(item => {
      const kind = text(item.label).toLowerCase();
      if (!['arxiv', 'slides'].includes(kind)) return;
      const anchor = link({label:'', url:item.url}, 'resource-link resource-' + kind); if (!anchor) return;
      const label = kind === 'arxiv' ? 'arXiv' : 'Slides';
      anchor.setAttribute('aria-label', `${label}: ${text(pub.title)}`); anchor.title = label;
      anchor.append(icon(kind), el('span', '', label)); resources.append(anchor);
    });
    if (resources.children.length) row.append(resources); else row.classList.add('no-resources');
    publications.append(row);
  });
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('nav a')];
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(anchor => { if (anchor.hash === '#' + entry.target.id) anchor.setAttribute('aria-current', 'location'); else anchor.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
  }
})();
