/* Small progressive enhancements; content and navigation work without JavaScript. */
(() => {
  'use strict';
  const dialog = document.getElementById('image-lightbox');
  const image = dialog?.querySelector('img');
  const caption = dialog?.querySelector('.lightbox-caption');
  const sizeButton = dialog?.querySelector('[data-size-toggle]');
  let lastTrigger = null;
  document.querySelectorAll('[data-zoom-image]').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog || !image || typeof dialog.showModal !== 'function') return;
      lastTrigger = button;
      image.src = button.dataset.zoomImage;
      image.alt = button.dataset.zoomAlt || '';
      caption.textContent = image.alt;
      dialog.classList.remove('natural');
      sizeButton?.setAttribute('aria-pressed', 'false');
      dialog.showModal();
    });
  });
  dialog?.querySelector('[data-close-lightbox]')?.addEventListener('click', () => dialog.close());
  sizeButton?.addEventListener('click', () => {
    const expanded = dialog.classList.toggle('natural');
    sizeButton.setAttribute('aria-pressed', String(expanded));
  });
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => { lastTrigger?.focus({preventScroll:true}); });
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => {
    video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); }));
  });
  document.querySelectorAll('[data-language]').forEach(link => {
    link.addEventListener('click', () => { if (location.hash) link.hash = location.hash; });
  });
})();
