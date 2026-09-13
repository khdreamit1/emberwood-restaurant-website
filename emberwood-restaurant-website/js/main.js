// =====================================================
// EMBERWOOD — shared site behavior
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- sticky nav solid state ---- */
  const nav = document.querySelector('.site-nav');
  const setNavState = () => {
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  /* ---- mobile menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- scroll to top ---- */
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 700) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- menu category filter (Menu page) ---- */
  const mfilters = document.querySelectorAll('.mfilter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  if (mfilters.length && menuItems.length) {
    mfilters.forEach(btn => {
      btn.addEventListener('click', () => {
        mfilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        menuItems.forEach(item => {
          const match = cat === 'all' || item.dataset.category === cat;
          item.classList.toggle('show', match);
        });
      });
    });
  }

  /* ---- gallery category filter (Gallery page) ---- */
  const gfilters = document.querySelectorAll('.gfilter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid figure');
  if (gfilters.length && galleryItems.length) {
    gfilters.forEach(btn => {
      btn.addEventListener('click', () => {
        gfilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        galleryItems.forEach(fig => {
          const match = cat === 'all' || fig.dataset.category === cat;
          fig.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---- lightbox ---- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-grid figure img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ---- demo form handling (no backend attached yet) ---- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-success');
      form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = true);
      form.querySelector('button[type="submit"]').textContent = 'Request Sent';
      if (note) note.style.display = 'block';
    });
  });

});
