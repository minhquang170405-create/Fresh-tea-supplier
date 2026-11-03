const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Mở menu');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !menu?.classList.contains('open')) return;
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Mở menu');
  menuButton?.focus();
});

document.querySelector('#quote-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#form-status');
  if (!form.reportValidity()) return;
  status.textContent = 'Biểu mẫu hợp lệ nhưng đang ở chế độ xem trước. Dữ liệu chưa được gửi hoặc lưu.';
});

