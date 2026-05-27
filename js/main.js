const mobileNav = document.querySelector('.mobile-nav');
const menuOpenButton = document.querySelector('[data-menu-open]');
const menuCloseButton = document.querySelector('[data-menu-close]');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const growthChartBars = document.querySelectorAll('.growth-chart__fill');
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const setMobileMenuState = (isOpen) => {
  if (!mobileNav || !menuOpenButton) return;

  mobileNav.classList.toggle('is-open', isOpen);
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  menuOpenButton.setAttribute('aria-expanded', String(isOpen));
};

menuOpenButton?.addEventListener('click', () => setMobileMenuState(true));
menuCloseButton?.addEventListener('click', () => setMobileMenuState(false));
mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => setMobileMenuState(false));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

window.setTimeout(() => {
  growthChartBars.forEach((bar) => {
    const targetWidth = bar.style.width;

    bar.style.width = '0';
    window.setTimeout(() => {
      bar.style.width = targetWidth;
    }, 300);
  });
}, 400);
