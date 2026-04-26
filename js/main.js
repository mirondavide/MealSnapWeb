/* Frix — minimal vanilla JS for FAQ accordion + mobile menu */

(function () {
  'use strict';

  // ---------- FAQ accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const ob = other.querySelector('.faq-q');
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- Mobile menu toggle ----------
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.removeAttribute('data-open');
      menu.setAttribute('hidden', '');
    };
    const openMenu = () => {
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('data-open', 'true');
      menu.removeAttribute('hidden');
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    // Close on link click
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();
