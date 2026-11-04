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

document.querySelector('#quote-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#form-status');
  if (!form.reportValidity()) return;
  status.textContent = form.dataset.previewMessage || 'Biểu mẫu hợp lệ nhưng đang ở chế độ xem trước. Dữ liệu chưa được gửi hoặc lưu.';
});
