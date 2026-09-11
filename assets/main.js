/* =============================================
   NAV SCROLL EFFECT
   ============================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* =============================================
   MOBILE MENU
   ============================================= */
const toggle = document.getElementById('nav-toggle');
const links  = document.getElementById('nav-links');

toggle?.addEventListener('click', () => {
  links.classList.toggle('open');
  document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
});

links?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =============================================
   SCROLL-REVEAL (lightweight, no deps)
   ============================================= */
const revealEls = document.querySelectorAll('.section-label, .section-title, .section-body, .course-card, .contact-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {});

// Attach revealed class styles
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* =============================================
   THEME TOGGLE (dark ↔ light)
   ============================================= */
(function () {
  const html = document.documentElement;
  const legacyBtn = document.getElementById('theme-toggle');
  const themeGroup = document.getElementById('theme-toggle-group');
  const groupBtns = themeGroup ? themeGroup.querySelectorAll('.toggle-btn') : [];
  const saved = localStorage.getItem('theme');

  // Apply saved or default (dark)
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
  }

  function updateThemeUI(theme) {
    if (legacyBtn) {
      legacyBtn.textContent = theme === 'light' ? '🌙' : '☀️';
      legacyBtn.setAttribute('aria-label', theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro');
    }

    if (groupBtns.length) {
      groupBtns.forEach(btn => {
        if (btn.getAttribute('data-theme-btn') === theme) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  updateThemeUI(currentTheme);

  legacyBtn?.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    if (nextTheme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeUI(nextTheme);
  });

  if (groupBtns.length) {
    groupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const nextTheme = btn.getAttribute('data-theme-btn');
        if (nextTheme === 'light') {
          html.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        } else {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'dark');
        }
        updateThemeUI(nextTheme);
      });
    });
  }
})();

/* =============================================
   LANGUAGE TOGGLE (en-uk ↔ pt-br)
   ============================================= */
(function () {
  const html = document.documentElement;
  const buttons = document.querySelectorAll('#lang-toggle-group .toggle-btn');
  const savedLang = localStorage.getItem('preferred-language');

  const pageTitle = {
    'en-uk': 'Gabi Surita',
    'pt-br': 'Gabi Surita'
  };

  const pageDesc = {
    'en-uk': 'Gabriela Surita — AI researcher working on code generation and intelligent agents.',
    'pt-br': 'Gabriela Surita — Pesquisadora de IA trabalhando com geração de código e agentes inteligentes.'
  };

  function setLanguage(lang) {
    if (!buttons.length) return;
    
    // 1. Set lang attribute on <html>
    html.setAttribute('lang', lang);
    
    // 2. Update active button class
    buttons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Update title and meta description dynamically
    document.title = pageTitle[lang] || pageTitle['en-uk'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc[lang] || pageDesc['en-uk']);
    }

    // 4. Save preference
    localStorage.setItem('preferred-language', lang);
  }

  // Only run if the language toggle element exists on the page (i.e. on the home page)
  if (buttons.length > 0) {
    // Determine initial language
    let initialLang = 'en-uk'; // default
    if (savedLang === 'en-uk' || savedLang === 'pt-br') {
      initialLang = savedLang;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('pt')) {
        initialLang = 'pt-br';
      }
    }

    // Apply initial language
    setLanguage(initialLang);

    // Add click listeners
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });
  }
})();

