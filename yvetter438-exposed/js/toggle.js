function toggleDetails(event, detailsId) {
  event.preventDefault();
  const details = document.getElementById(detailsId);
  const listItem = event.target.closest('li');
  details.classList.toggle('show');
  listItem.classList.toggle('expanded');
  if (typeof fillGutter === 'function') {
    requestAnimationFrame(fillGutter);
  }
}
