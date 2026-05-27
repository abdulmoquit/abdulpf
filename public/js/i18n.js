(function () {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const lang = browserLang.startsWith('fr') ? 'fr' : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  window.__I18N_LANG = lang;

  window.getCharHTML = function (ch) {
    if (ch === ' ') return '&nbsp;';
    if (ch === '🡲' || ch === '🡺') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></svg>';
    if (ch === '🡼') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-135 42 42.5)"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></g></svg>';
    if (ch === '🞣') return '<svg style="width: 0.9em; height: 0.9em; vertical-align: -0.1em; transform: translateY(-0.1em);" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"/></svg>';
    return ch;
  };

  // Avoid French early return to always force English translations
  const T = {
    'meta.description': 'Portfolio of Abdul Moquit - Commerce student passionate about business, data science, and technology',

    'index.title': 'Abdul Moquit, Commerce Student & Analyst',
    'index.h1': 'Abdul Moquit, Commerce student passionate about business, data science, and technology based in Kolkata, India.',
    'index.hero.tagline': 'Commerce student, <span class="other-accent">bridging data and business</span>,<br>through analytics, technology and design.',
    'index.about.text': 'As a <span class="other-accent">commerce student</span>, I build analytics solutions, bridging the gap between <span class="other-accent">business strategy</span> and technical execution.',
    'index.about.sub': "My name is Abdul Moquit. I am a commerce student based in Kolkata, India, passionate about data science, market research, and web technologies. I explore how data can drive business value.",
    'index.cg.phrase': "Each project is an opportunity to <span class=\"other-accent\">learn</span>, <span class=\"other-accent\">experiment</span> and push my limits.",
    'index.skills.subtitle': 'Skills',
    'index.skills.text': 'Commerce student passionate about business, data science, and technology. Specializing in data analysis, market research, and web application development.',
    'index.skills.programming': 'Programming',
    'index.skills.datascience': 'Data Science',
    'index.skills.webdev': 'Web Development',
    'index.skills.tools': 'Tools & Platforms',
    'index.skills.business': 'Business & Analytics',
    'index.skills.frontend': 'Programming',
    'index.skills.animation': 'Data Science',
    'index.skills.backend': 'Web Development',
    'index.skills.database': 'Tools & Platforms',
    'index.skills.devops': 'Business & Analytics',
    'index.skills.security': 'Tools',
    'index.skills.design': 'Business',
    'index.contact.title': 'Contact',
    'index.contact.dispo1': "Currently seeking <span class=\"other-accent\">exciting opportunities</span> at the intersection of business, data, and technology.",
    'index.contact.dispo2': "Available for <span class=\"other-accent\">collaborations and freelance projects</span> globally, helping solve business problems with data.",
    'index.proj.label': 'Preview',
    'index.detail.back': '🡼BACK',

    'info.title': 'Info, Abdul Moquit',
    'info.eyebrow': 'About',
    'info.role': 'Commerce student specializing in business strategy, data analytics, and web technology.',
    'info.desc': "As a commerce student, I build analytics solutions, bridging the gap between business strategy and technical execution. I explore how data can drive business value.",
    'info.meta.based': 'Based in',
    'info.meta.status': 'Status',
    'info.meta.based.value': 'Kolkata, India',
    'info.meta.status.value': 'Student / Freelance',
    'info.skills.programming': 'Programming',
    'info.skills.datascience': 'Data Science',
    'info.skills.tools': 'Tools',
    'info.skills.business': 'Business',
    'info.skills.frontend': 'Programming',
    'info.skills.animation': 'Data Science',
    'info.skills.backend': 'Tools',
    'info.skills.security': 'Business',

    'contact.title': 'Contact, Abdul Moquit',
    'contact.panel.title': "Let's talk about your project.",
    'contact.panel.copy': "I respond quickly to queries regarding collaborations, data science projects, and freelance opportunities.",
    'contact.meta.base': 'Base',
    'contact.meta.status': 'Status',
    'contact.meta.delay': 'Avg. response',
    'contact.meta.base.value': 'Kolkata, India',
    'contact.meta.status.value': 'Student / Freelance',
    'contact.meta.delay.value': '24h',
    'contact.eyebrow': 'Contact',
    'contact.role': 'Commerce student specializing in business strategy, data analytics, and web technology.',
    'contact.desc': "If you have a business problem to solve, a data analysis project, or an interesting collaboration in mind, I would love to hear from you.",
    'contact.shortcuts': 'Shortcuts',
    'contact.brief': 'Brief format',
    'contact.maildirect': 'Direct mail',
    'contact.brief.product': 'Business objective',
    'contact.brief.deadline': 'Target deadline',
    'contact.brief.stack': 'Preferred tech stack',
    'contact.brief.deliverables': 'Expected outputs',

    'works.title': 'Work, Abdul Moquit',
    'works.h1': 'Projects, Abdul Moquit, Commerce Student & Analyst. Discover my work in data science, analytics, and technology.',

    'common.aria.back': 'Back to home',
    'common.aria.menu': 'Main navigation',
    'common.aria.social': 'Social links',
    'common.aria.footer': 'Footer navigation',
  };

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (T[key] != null) el.innerHTML = T[key];
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
      const idx = pair.indexOf(':');
      if (idx < 0) return;
      const attr = pair.slice(0, idx).trim();
      const key = pair.slice(idx + 1).trim();
      if (T[key] != null) el.setAttribute(attr, T[key]);
    });
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey && T[titleKey]) document.title = T[titleKey];

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && T['meta.description']) descMeta.setAttribute('content', T['meta.description']);

  window.__t = function (key) { return T[key]; };
})();
