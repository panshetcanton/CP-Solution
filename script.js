// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ========== SMOOTH SCROLL ACTIVE NAV ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--teal)';
    }
  });
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== HERO SLIDESHOW ==========
(function () {
  const slides = document.querySelectorAll('.hs-slide');
  const dots   = document.querySelectorAll('.hs-dot');
  const btnPrev = document.getElementById('hsPrev');
  const btnNext = document.getElementById('hsNext');
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const DELAY = 4500;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function start() {
    stop();
    timer = setInterval(() => goTo(current + 1), DELAY);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  btnPrev.addEventListener('click', () => { goTo(current - 1); start(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); start(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(+dot.dataset.index); start(); });
  });

  const section = document.getElementById('hero-slideshow');

  // Swipe support
  let tx = 0;
  section.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  section.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); start(); }
  }, { passive: true });

  start();
})();

// ========== PROJECT SLIDESHOWS ==========
(function() {
  const slideshows = document.querySelectorAll('.project-slideshow');

  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.ps-slide');
    const dots = slideshow.querySelectorAll('.ps-dot');
    const prevBtn = slideshow.querySelector('.ps-arrow--prev');
    const nextBtn = slideshow.querySelector('.ps-arrow--next');
    
    if (!slides.length) return;

    let current = 0;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(+dot.dataset.index));
    });

    // Swipe support for project slideshows
    let tx = 0;
    slideshow.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
    slideshow.addEventListener('touchend', e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); }
    }, { passive: true });
  });
})();
