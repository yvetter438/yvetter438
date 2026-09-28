function fillGutter() {
  document.querySelectorAll('.line-gutter').forEach((row) => {
    const gutter = row.querySelector('.gutter');
    const body = row.querySelector('.markup-body');
    if (!gutter || !body) return;

    const lineHeight =
      parseFloat(getComputedStyle(body).lineHeight) ||
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.55;

    const lines = Math.max(24, Math.ceil(body.scrollHeight / lineHeight) + 8);
    gutter.innerHTML = '';
    for (let i = 1; i <= lines; i += 1) {
      const span = document.createElement('span');
      span.textContent = String(i);
      gutter.appendChild(span);
    }
  });
}

document.addEventListener('DOMContentLoaded', fillGutter);
window.addEventListener('resize', fillGutter);
