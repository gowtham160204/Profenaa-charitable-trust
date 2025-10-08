const heroSection = document.querySelector('.hero-img-connect-all-container');

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  let maxScroll = window.innerHeight; // Full height of hero section
  let scaleValue = 1 - (scrollTop / (maxScroll * 2)); // Shrinks gradually

  if (scaleValue < 0.5) scaleValue = 1; // Minimum shrink limit
  heroSection.style.transform = `scale(${scaleValue})`;
});
