(() => {
  'use strict';
  const p = window.PROFILE;
  const strings = {
    en: {navAbout:'About',navResearch:'Research',navPublications:'Publications',navContact:'Contact',field:'THEORETICAL COMPUTER SCIENCE',getInTouch:'Get in touch',viewPublications:'View publications',templateNote:'Personal details are placeholders.',graphCaption:'A little structure.',researchTitle:'Research interests',researchNote:'Example areas; replace with your own research interests.',publicationsTitle:'Selected publications',publicationsIntro:'Papers, preprints, and other research work.',publicationsNote:'The entries above show the layout only; no actual publications have been added.',contactTitle:'Contact',contactIntro:'For research conversations and academic correspondence.',footerTag:'Ideas, proofs, and open questions.',backToTop:'Back to top',abstract:'Abstract',emailPending:'Your email address goes here',empty:'No publications listed yet.'},
    zh: {navAbout:'关于',navResearch:'研究方向',navPublications:'论文',navContact:'联系',field:'理论计算机科学',getInTouch:'联系我',viewPublications:'查看论文',templateNote:'个人资料尚待填写，当前为占位内容。',graphCaption:'从结构出发。',researchTitle:'研究方向',researchNote:'以上为示例方向，请替换为你自己的研究兴趣。',publicationsTitle:'代表论文',publicationsIntro:'论文、预印本与其他研究工作。',publicationsNote:'以上条目仅展示排版，尚未添加真实论文。',contactTitle:'联系方式',contactIntro:'欢迎交流研究问题与学术想法。',footerTag:'想法、证明与开放问题。',backToTop:'回到顶部',abstract:'摘要',emailPending:'在这里填写你的邮箱',empty:'暂未列出论文。'}
  };
  let lang = 'en';
  try { const saved=localStorage.getItem('homepage-language'); if(saved==='zh'||saved==='en') lang=saved; } catch {}
  const localized = value => typeof value === 'string' ? value : (value?.[lang] || value?.en || '');
  const el = (tag, cls, value) => { const e=document.createElement(tag); if(cls)e.className=cls;if(value!==undefined)e.textContent=value;return e; };
  const safeUrl = value => { try { const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null; }catch{return null;} };
  function link(item) {const url=safeUrl(item.url);if(!url)return null;const a=el('a','',localized(item.label));a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.title=`${lang==='zh'?(p.chineseName||p.name):p.name} · ${lang==='zh'?'个人主页':'Academic Homepage'}`;
    document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=strings[lang][e.dataset.i18n]);
    document.querySelectorAll('[data-name]').forEach(e=>e.textContent=p.name);
    document.querySelectorAll('[data-chinese-name]').forEach(e=>e.textContent=p.chineseName||'');
    document.querySelectorAll('[data-profile]').forEach(e=>e.textContent=localized(p[e.dataset.profile]));
    const btn=document.getElementById('language-toggle');btn.replaceChildren(document.createTextNode(lang==='en'?'中文 ':'EN '),el('span','','↗'));btn.lastChild.setAttribute('aria-hidden','true');btn.setAttribute('aria-label',lang==='en'?'切换为中文':'Switch to English');
    const topics=document.getElementById('research-topics');topics.replaceChildren(...p.interests.map(t=>el('span','topic',localized(t))));
    const list=document.getElementById('publication-list');list.replaceChildren();
    if(!p.publications.length)list.append(el('p','empty-publications',strings[lang].empty));
    p.publications.forEach(pub=>{
      const row=el('article','publication');row.append(el('div','pub-year',pub.year));
      const content=el('div','pub-content');
      content.append(el('h3','pub-title',localized(pub.title)));
      if(localized(pub.authors)){
        const authors=el('p','pub-authors');const parts=localized(pub.authors).split(p.name);
        parts.forEach((part,i)=>{if(i)authors.append(el('strong','',p.name));authors.append(document.createTextNode(part));});content.append(authors);
      }
      content.append(el('p','pub-venue',localized(pub.venue)));
      const actions=el('div','pub-actions');(pub.links||[]).forEach(item=>{const a=link(item);if(a)actions.append(a);});
      if(localized(pub.abstract)){const d=el('details');d.append(el('summary','',strings[lang].abstract),el('p','abstract',localized(pub.abstract)));actions.append(d);}
      content.append(actions);row.append(content);list.append(row);
    });
    const email=document.getElementById('email-container');email.replaceChildren();
    if(p.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)){const a=el('a','email',p.email);a.href='mailto:'+p.email;email.append(a);}else{email.append(el('span','email pending',strings[lang].emailPending));}
    const profiles=document.getElementById('profile-links');profiles.replaceChildren();(p.links||[]).forEach(item=>{const a=link(item);if(a)profiles.append(a);});
    ['template-note','research-note','publications-note'].forEach(id=>document.getElementById(id).classList.toggle('hidden',!p.isTemplate));
    document.getElementById('current-year').textContent=new Date().getFullYear();
  }
  document.getElementById('language-toggle').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';try{localStorage.setItem('homepage-language',lang);}catch{}render();});
  if('IntersectionObserver' in window){const navLinks=[...document.querySelectorAll('nav a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px',threshold:0});document.querySelectorAll('main>section').forEach(s=>observer.observe(s));}
  render();
})();
