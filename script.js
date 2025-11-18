const STORAGE_KEY = 'linarya-theme';

const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearTarget = document.getElementById('year');

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);

  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    const label = themeToggle.querySelector('.toggle-label');
    const icon = themeToggle.querySelector('.toggle-icon');

    if (label) {
      label.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    }
    if (icon) {
      icon.textContent = isDark ? '☀︎' : '☾';
    }
  }
};

const detectTheme = () => {
  const storedTheme = localStorage.getItem(STORAGE_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  return prefersDarkScheme.matches ? 'dark' : 'light';
};

applyTheme(detectTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

if (navToggle && navLinks) {
  const toggleNav = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('is-open');
  };

  navToggle.addEventListener('click', toggleNav);

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

