/* ============================================
   LAUNCHFOLIO — script.js
   Spring reveals · Parallax · FAQ · Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Intersection Observer — Spring Slide-Up Reveals ---- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Parallax on project images ---- */
  const parallaxImgs = document.querySelectorAll('.parallax-img');

  function handleParallax() {
    parallaxImgs.forEach(img => {
      const rect  = img.getBoundingClientRect();
      const vh    = window.innerHeight;
      // how far through the viewport (0 = just entered bottom, 1 = just left top)
      const ratio = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
      // move image UP slower than page: -12px at top, +12px at bottom
      const yShift = (ratio - 0.5) * 28;
      img.style.transform = `translateY(${yShift}px)`;
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax(); // initial call

  /* ---- FAQ Accordion with spring ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---- Mobile Nav Toggle ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 68; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        navLinks?.classList.remove('open');
      }
    });
  });

  /* ---- Navbar — shadow on scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.07)'
      : 'none';
  }, { passive: true });

  /* ---- Hero CTA gap expansion on hover ---- */
  const heroCta = document.getElementById('hero-cta');
  heroCta?.addEventListener('mouseenter', () => { heroCta.style.gap = '16px'; });
  heroCta?.addEventListener('mouseleave', () => { heroCta.style.gap = '10px'; });

  /* ---- Footer book now button lime glow ---- */
  const bookBtn = document.getElementById('book-btn');
  bookBtn?.addEventListener('mouseenter', () => {
    bookBtn.style.letterSpacing = '0.03em';
  });
  bookBtn?.addEventListener('mouseleave', () => {
    bookBtn.style.letterSpacing = 'normal';
  });

  /* ---- Marquee pause on hover (handled in CSS) ---- */

  /* ---- Optional: make footer wordmark track mouse for subtle depth ---- */
  const wordmark = document.querySelector('.footer-wordmark');
  if (wordmark) {
    document.addEventListener('mousemove', (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 6;
      wordmark.style.transform = `translateX(${xPct}px)`;
    });
  }

});
