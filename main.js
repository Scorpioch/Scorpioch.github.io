(() => {
  'use strict';
  const profile = window.PROFILE;
  const strings = {
    en: { navAbout: 'About', navResearch: 'Research', navEducation: 'Education', navPublications: 'Publications', field: 'THEORETICAL COMPUTER SCIENCE', graphCaption: 'A little structure.', researchTitle: 'Research interests', educationTitle: 'Education', publicationsTitle: 'Publications', authorNote: 'Authors are listed alphabetically unless otherwise stated.', footerTag: 'Ideas, proofs, and open questions.', backToTop: 'Back to top', resources: 'Resources for', empty: 'No publications listed yet.' },
    zh: { navAbout: '关于', navResearch: '研究方向', navEducation: '教育经历', navPublications: '论文', field: '理论计算机科学', graphCaption: '从结构出发。', researchTitle: '研究方向', educationTitle: '教育经历', publicationsTitle: '论文', authorNote: '除非另有说明，作者按姓氏字母顺序排列。', footerTag: '想法、证明与开放问题。', backToTop: '回到顶部', resources: '论文资源：', empty: '暂未列出论文。' }
  };
  let lang = 'en';
  try { const saved = localStorage.getItem('homepage-language'); if (saved === 'zh' || saved === 'en') lang = saved; } catch {}
  const localized = value => typeof value === 'string' ? value : (value?.[lang] || value?.en || '');
  const el = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; };
  function safeUrl(value) {
    if (!value) return null;
    try { const url = new URL(value, document.baseURI); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  function externalLink(item, className = '') {
    const url = safeUrl(item.url); if (!url) return null;
    const anchor = el('a', className, localized(item.label)); anchor.href = url; anchor.setAttribute('aria-label', localized(item.label)); anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; return anchor;
  }
  function resourceIcon() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.5'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round'); svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(ns, 'path'); path.setAttribute('d', 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z M14 3v5h5 M8.5 12h7 M8.5 15.5h7'); svg.append(path); return svg;
  }
  function closeResources(except) { document.querySelectorAll('.pub-resources[open]').forEach(menu => { if (menu !== except) menu.open = false; }); }
  function render() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = `${lang === 'zh' ? (profile.chineseName || profile.name) : profile.name} · ${lang === 'zh' ? '个人主页' : 'Academic Homepage'}`;
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = strings[lang][node.dataset.i18n]; });
    document.querySelectorAll('[data-name]').forEach(node => { node.textContent = profile.name; });
    document.querySelectorAll('[data-chinese-name]').forEach(node => { node.textContent = profile.chineseName || ''; });
    document.querySelectorAll('[data-profile]').forEach(node => { node.textContent = localized(profile[node.dataset.profile]); });
    const toggle = document.getElementById('language-toggle'); toggle.textContent = lang === 'en' ? '中文' : 'EN'; toggle.setAttribute('aria-label', lang === 'en' ? '切换为中文' : 'Switch to English');
    const email = document.getElementById('email-link'); email.textContent = profile.email; email.href = 'mailto:' + profile.email;
    const profiles = document.getElementById('profile-links'); profiles.replaceChildren();
    (profile.links || []).forEach(item => { const link = externalLink(item); if (link) profiles.append(link); });
    document.getElementById('research-topics').replaceChildren(...profile.interests.map(topic => el('span', 'topic', localized(topic))));
    const education = document.getElementById('education-list'); education.replaceChildren();
    profile.education.forEach(item => {
      const row = el('article', 'education-item'); row.append(el('div', 'education-year', localized(item.years)));
      const content = el('div', 'education-content'); content.append(el('h3', 'education-degree', localized(item.degree)), el('p', 'education-institution', localized(item.institution)));
      if (localized(item.note)) content.append(el('p', 'education-note', localized(item.note)));
      row.append(content); education.append(row);
    });
    const publications = document.getElementById('publication-list'); publications.replaceChildren();
    if (!profile.publications.length) publications.append(el('p', 'empty-publications', strings[lang].empty));
    profile.publications.forEach(pub => {
      const row = el('article', 'publication'); row.append(el('div', 'pub-year', pub.year));
      const content = el('div', 'pub-content'); content.append(el('h3', 'pub-title', localized(pub.title)));
      const authors = el('p', 'pub-authors'); localized(pub.authors).split(profile.name).forEach((part, index) => { if (index) authors.append(el('strong', '', profile.name)); authors.append(document.createTextNode(part)); }); content.append(authors, el('p', 'pub-venue', localized(pub.venue))); row.append(content);
      const links = (pub.links || []).map(item => externalLink(item)).filter(Boolean);
      if (links.length) {
        const resources = el('details', 'pub-resources'); const summary = el('summary'); const label = `${strings[lang].resources} ${localized(pub.title)}`;
        summary.setAttribute('aria-label', label); summary.title = label; summary.append(resourceIcon());
        const panel = el('div', 'resource-menu'); links.forEach(link => { link.append(el('span', 'resource-arrow', '↗')); panel.append(link); }); resources.append(summary, panel);
        resources.addEventListener('toggle', () => { if (resources.open) closeResources(resources); }); row.append(resources);
      }
      publications.append(row);
    });
    document.getElementById('current-year').textContent = new Date().getFullYear();
  }
  document.getElementById('language-toggle').addEventListener('click', () => { lang = lang === 'en' ? 'zh' : 'en'; try { localStorage.setItem('homepage-language', lang); } catch {} render(); });
  document.addEventListener('click', event => { if (!event.target.closest('.pub-resources')) closeResources(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { const active = document.activeElement.closest('.pub-resources'); closeResources(); if (active) active.querySelector('summary').focus(); } });
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('nav a')];
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
  }
  render();
})();
