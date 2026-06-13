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

// Testimonials carousel
const carouselEl = document.querySelector('.testimonials-carousel');
const carouselTrack = document.querySelector('.testimonials-track');
const carouselCards = Array.from(document.querySelectorAll('.testimonials-track .testimonial-card'));
const dotsContainer = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');

let currentSlide = 0;
let slideOffsetsPx = [];
let autoSlideTimer = null;
let resumeTimer = null;

const getCardsPerView = () => {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

const getTotalSlides = () => Math.max(1, carouselCards.length - getCardsPerView() + 1);

const buildDots = () => {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < getTotalSlides(); i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === currentSlide ? ' is-active' : '');
    dot.setAttribute('aria-label', `Відгук ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
};

const updateDots = () => {
  Array.from(dotsContainer.querySelectorAll('.carousel-dot')).forEach((dot, i) => {
    dot.classList.toggle('is-active', i === currentSlide);
  });
};

const calcOffsets = () => {
  const savedTransition = carouselTrack.style.transition;
  carouselTrack.style.transition = 'none';
  carouselTrack.style.transform = '';
  void carouselTrack.offsetWidth;
  const viewportLeft = carouselTrack.parentElement.getBoundingClientRect().left;
  slideOffsetsPx = carouselCards.map((card) =>
    Math.round(card.getBoundingClientRect().left - viewportLeft)
  );
  carouselTrack.style.transition = savedTransition;
};

const goToSlide = (index) => {
  const total = getTotalSlides();
  currentSlide = ((index % total) + total) % total;
  carouselTrack.style.transform = `translateX(-${slideOffsetsPx[currentSlide] || 0}px)`;
  updateDots();
};

const startAutoSlide = () => {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideTimer);
  clearTimeout(resumeTimer);
};

carouselEl?.addEventListener('mouseenter', () => stopAutoSlide());
carouselEl?.addEventListener('mouseleave', () => {
  resumeTimer = setTimeout(startAutoSlide, 5000);
});

prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

const initCarousel = () => {
  if (currentSlide >= getTotalSlides()) currentSlide = 0;
  calcOffsets();
  buildDots();
  goToSlide(currentSlide);
};

window.addEventListener('resize', initCarousel);
initCarousel();
startAutoSlide();


window.setTimeout(() => {
  growthChartBars.forEach((bar) => {
    const targetWidth = bar.style.width;

    bar.style.width = '0';
    window.setTimeout(() => {
      bar.style.width = targetWidth;
    }, 300);
  });
}, 400);
