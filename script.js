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

  /* ---- Mobile Nav Toggle with Stagger ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navItems  = navLinks?.querySelectorAll('a');
  
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    
    if (navLinks.classList.contains('open')) {
      // Apply stagger fade-in
      navItems?.forEach((item, index) => {
        item.style.animation = `mobileLinkFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards ${index * 0.05}s`;
      });
    } else {
      // Reset animation
      navItems?.forEach(item => {
        item.style.animation = 'none';
      });
    }
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 100; // floating navbar height + padding
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        navLinks?.classList.remove('open');
        hamburger?.classList.remove('open');
      }
    });
  });

  /* ---- Navbar Scroll Shrink Logic ---- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add subtle shadow when not at top
    if (currentScrollY > 10) {
      navbar.style.boxShadow = '0 12px 48px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Shrink logic (scroll > 50px)
    if (currentScrollY > 50) {
      if (!navLinks.classList.contains('open')) {
        navbar.classList.add('shrunk');
      }
    } else {
      navbar.classList.remove('shrunk');
    }
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

  /* ---- Floating Speak Widget Logic ---- */
  const speakWrapper = document.getElementById('speak-wrapper');
  const speakWidget = document.getElementById('speak-widget');

  if (speakWrapper && speakWidget) {
    const heroSection = document.querySelector('.hero');
    
    // Entrance & Footer Hide Logic
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;
      
      const triggerPoint = heroSection ? heroSection.offsetHeight * 0.8 : 500;
      
      if (scrollY > triggerPoint) {
        speakWrapper.classList.add('entered');
      } else {
        speakWrapper.classList.remove('entered');
      }

      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 100;
      if (scrolledToBottom) {
        speakWrapper.classList.add('hidden');
      } else {
        speakWrapper.classList.remove('hidden');
      }
    }, { passive: true });

    // 3. Magnetic Hover Effect
    const triggerDistance = 30;
    
    document.addEventListener('mousemove', (e) => {
      if (!speakWrapper.classList.contains('entered') || speakWrapper.classList.contains('hidden')) return;

      const rect = speakWrapper.getBoundingClientRect();
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distToEdge = Math.sqrt(dx * dx + dy * dy);

      if (distToEdge < triggerDistance || (dx === 0 && dy === 0)) {
        speakWrapper.classList.add('magnetic-hover');
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const maxPull = 15;
        const pullX = ((e.clientX - centerX) / (rect.width / 2 + triggerDistance)) * maxPull;
        const pullY = ((e.clientY - centerY) / (rect.height / 2 + triggerDistance)) * maxPull;
        
        const scale = (dx === 0 && dy === 0) ? 1.05 : 1;
        
        speakWidget.style.transform = `translateX(${pullX}px) translateY(${pullY}px) scale(${scale})`;
      } else {
        speakWrapper.classList.remove('magnetic-hover');
        speakWidget.style.transform = `translateX(0) translateY(0) scale(1)`;
      }
    });

    speakWidget.addEventListener('mouseleave', () => {
      speakWrapper.classList.remove('magnetic-hover');
      speakWidget.style.transform = `translateX(0) translateY(0) scale(1)`;
    });
  }

});
