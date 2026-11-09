const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');
const languageSwitcher = document.querySelector('.language-switcher');
const menuOpenLabel = menuButton?.dataset.menuOpenLabel || 'Mở menu';
const menuCloseLabel = menuButton?.dataset.menuCloseLabel || 'Đóng menu';

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? menuCloseLabel : menuOpenLabel);
  if (isOpen && languageSwitcher) languageSwitcher.open = false;
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', menuOpenLabel);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (languageSwitcher?.open) {
    languageSwitcher.open = false;
    languageSwitcher.querySelector('summary')?.focus();
  }
  if (menu?.classList.contains('open')) {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', menuOpenLabel);
    menuButton?.focus();
  }
});

document.addEventListener('click', (event) => {
  if (languageSwitcher?.open && !languageSwitcher.contains(event.target)) languageSwitcher.open = false;
});

languageSwitcher?.addEventListener('toggle', () => {
  if (!languageSwitcher.open || !menu?.classList.contains('open')) return;
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', menuOpenLabel);
});

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('.gallery-track');
  const cards = [...track.querySelectorAll('.gallery-card')];
  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  let activeIndex = 0;
  let scrollFrame = 0;
  let targetLeft = null;
  const visibleCount = () => window.matchMedia('(max-width: 560px)').matches ? 1 : 2;
  const maxStart = () => Math.max(0, cards.length - visibleCount());

  const render = () => {
    previous.disabled = activeIndex <= 0;
    next.disabled = activeIndex >= maxStart();
  };

  const indexFromScroll = () => Math.min(maxStart(), cards.reduce((closest, card, index) =>
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[closest].offsetLeft - track.scrollLeft) ? index : closest, 0));

  const moveTo = (index) => {
    activeIndex = Math.max(0, Math.min(maxStart(), index));
    targetLeft = cards[activeIndex].offsetLeft;
    track.scrollTo({
      left: targetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    render();
  };

  previous.addEventListener('click', () => moveTo(activeIndex - visibleCount()));
  next.addEventListener('click', () => moveTo(activeIndex + visibleCount()));
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveTo(activeIndex + (event.key === 'ArrowRight' ? visibleCount() : -visibleCount()));
  });
  track.addEventListener('pointerdown', () => { targetLeft = null; });
  track.addEventListener('wheel', () => { targetLeft = null; }, { passive: true });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      if (targetLeft !== null && Math.abs(track.scrollLeft - targetLeft) > 2) return;
      targetLeft = null;
      activeIndex = indexFromScroll();
      render();
    });
  }, { passive: true });
  track.addEventListener('scrollend', () => {
    targetLeft = null;
    activeIndex = indexFromScroll();
    render();
  });
  window.addEventListener('resize', () => moveTo(activeIndex));
  render();
});

// Only reset disclosure defaults when crossing the phone breakpoint.
// Keyboard opening and browser-toolbar resizing must not discard the user's choice.
const phoneLayout = window.matchMedia('(max-width: 560px)');
const mobileDisclosures = [...document.querySelectorAll('[data-mobile-disclosure]')];
const setDisclosureDefaults = () => {
  mobileDisclosures.forEach((details) => { details.open = !phoneLayout.matches; });
};
setDisclosureDefaults();
phoneLayout.addEventListener('change', setDisclosureDefaults);

const quoteForm = document.querySelector('#quote-form');
const formStatus = quoteForm?.querySelector('#form-status');
const clearFormStatus = () => {
  if (formStatus) {
    formStatus.textContent = '';
    delete formStatus.dataset.state;
  }
};

const fieldError = (field) => document.getElementById(field.getAttribute('aria-describedby'));
const clearFieldError = (field) => {
  if (!field.matches('input, textarea')) return;
  field.removeAttribute('aria-invalid');
  const error = fieldError(field);
  if (error) { error.textContent = ''; error.hidden = true; }
};
const validateField = (field) => {
  const valid = field.checkValidity();
  const error = fieldError(field);
  if (valid) {
    clearFieldError(field);
  } else {
    field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = field.validity.valueMissing ? field.dataset.requiredMessage : (field.dataset.invalidMessage || field.validationMessage);
      error.hidden = false;
    }
  }
  return valid;
};
['input', 'change'].forEach((type) => quoteForm?.addEventListener(type, (event) => {
  clearFormStatus();
  clearFieldError(event.target);
}));
// Validate on submission so blur messages cannot move a pointer's click target.
quoteForm?.querySelector('.form-submit')?.addEventListener('click', () => {
  clearFormStatus();
  const fields = [...quoteForm.querySelectorAll('input, textarea')];
  const invalidField = fields.filter((field) => !validateField(field))[0];
  if (invalidField) {
    const disclosure = invalidField.closest('details');
    if (disclosure) disclosure.open = true;
    if (formStatus) {
      formStatus.dataset.state = 'error';
      formStatus.textContent = quoteForm.dataset.invalidMessage;
    }
    invalidField.focus();
    invalidField.scrollIntoView({ block: 'center' });
    return;
  }
  if (formStatus) {
    formStatus.textContent = quoteForm.dataset.previewMessage || 'Biểu mẫu hợp lệ nhưng đang ở chế độ xem trước. Dữ liệu chưa được gửi hoặc lưu.';
  }
});
