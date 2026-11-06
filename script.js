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
  const count = gallery.querySelector('.gallery-count');
  let activeIndex = 0;
  let scrollFrame = 0;

  const render = () => {
    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };

  const indexFromScroll = () => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) return cards.length - 1;
    return cards.reduce((closest, card, index) =>
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[closest].offsetLeft - track.scrollLeft) ? index : closest, 0);
  };

  const moveTo = (index) => {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({
      left: cards[activeIndex].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    render();
  };

  previous.addEventListener('click', () => moveTo(activeIndex - 1));
  next.addEventListener('click', () => moveTo(activeIndex + 1));
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      activeIndex = indexFromScroll();
      render();
    });
  }, { passive: true });
  window.addEventListener('resize', render);
  render();
});

document.querySelector('#quote-form .form-submit')?.addEventListener('click', (event) => {
  const form = event.currentTarget.closest('#quote-form');
  const status = document.querySelector('#form-status');
  const invalidField = [...form.querySelectorAll('input, textarea')].find((field) => !field.checkValidity());
  if (invalidField) {
    invalidField.reportValidity();
    return;
  }
  status.textContent = form.dataset.previewMessage || 'Biểu mẫu hợp lệ nhưng đang ở chế độ xem trước. Dữ liệu chưa được gửi hoặc lưu.';
});
