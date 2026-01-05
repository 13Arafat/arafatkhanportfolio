document.querySelectorAll('.slider-2col, .slider-3col').forEach(slider => {
  const track = slider.querySelector('[class^="track"]');
  if (!track) return;

  const slides = Array.from(track.children);
  const nextBtn = slider.querySelector('.arrow.right');
  const prevBtn = slider.querySelector('.arrow.left');

  let index = 0;

  function slideFullWidth() {
    const slide = slides[0];
    const style = getComputedStyle(slide);
    return (
      slide.getBoundingClientRect().width +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight)
    );
  }

  function visibleSlides() {
    const containerWidth = slider.clientWidth;
    return Math.max(1, Math.floor(containerWidth / slideFullWidth()));
  }

  function maxIndex() {
    return Math.max(0, slides.length - visibleSlides());
  }

  function update() {
    track.style.transform = `translateX(-${index * slideFullWidth()}px)`;
  }

  nextBtn?.addEventListener('click', () => {
    if (index < maxIndex()) {
      index++;
      update();
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  /* ===== TOUCH SUPPORT ===== */
  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50 && index < maxIndex()) index++;
    if (diff < -50 && index > 0) index--;

    update();
  });

  /* ===== RESIZE FIX ===== */
  window.addEventListener('resize', () => {
    index = Math.min(index, maxIndex());
    update();
  });
});
