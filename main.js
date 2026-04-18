/* ================================================================
   PORTFOLIO — Shashank Tiwari
   main.js
   ================================================================ */

(function () {
  /* ── THEME TOGGLE ─────────────────────────────────────────── */
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const sunIcon   = document.getElementById('iconSun');
  const moonIcon  = document.getElementById('iconMoon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (sunIcon && moonIcon) {
      sunIcon.style.display  = theme === 'light' ? 'none'  : 'inline';
      moonIcon.style.display = theme === 'light' ? 'inline': 'none';
    }
  }

  // Load saved or system preference
  const saved   = localStorage.getItem('portfolio-theme');
  const prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || prefers);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  /* ── CUSTOM CURSOR ────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (cursor && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animCursor() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  /* ── NAV SCROLL ───────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── HAMBURGER MENU ───────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── REVEAL ON SCROLL ─────────────────────────────────────── */
  const reveals  = document.querySelectorAll('.reveal');
  const revealOb = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        revealOb.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealOb.observe(r));

  /* ── SKILL BAR ANIMATION ──────────────────────────────────── */
  const bars   = document.querySelectorAll('.bar-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObs.observe(b));

  /* ── CONTACT FORM (simple UX feedback) ───────────────────── */
  const form    = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');

  if (form && sendBtn) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      sendBtn.textContent = 'Sent ✓';
      sendBtn.style.background = 'var(--accent)';
      sendBtn.style.color = '#0a0a0a';
      sendBtn.disabled = true;
      setTimeout(() => {
        sendBtn.textContent = 'Send Message';
        sendBtn.style.background = '';
        sendBtn.style.color = '';
        sendBtn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

})();
