const header = document.querySelector(".site-header");
const scrollTopLink = document.querySelector("[data-scroll-top]");

const setHeaderShadow = () => {
  header.toggleAttribute("data-scrolled", window.scrollY > 24);
};

const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);

const animateScrollTop = () => {
  const scroller = document.scrollingElement || document.documentElement;
  const startY = scroller.scrollTop;
  const duration = Math.min(2800, Math.max(1600, startY * 0.42));
  let startTime = null;

  const step = (timestamp) => {
    startTime ??= timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);

    scroller.scrollTop = startY * (1 - eased);

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    scroller.scrollTop = 0;
  };

  requestAnimationFrame(step);
};

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

scrollTopLink?.addEventListener("click", (event) => {
  event.preventDefault();
  animateScrollTop();
});
