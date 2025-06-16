import { i as isMobile } from "./app.min.js";
document.addEventListener("DOMContentLoaded", () => {
  const tooltips = document.querySelectorAll(".tooltip");
  function removeAllActiveTooltips() {
    document.querySelectorAll(".tooltip__content.--active").forEach((el) => {
      el.classList.remove("--active");
    });
  }
  if (isMobile.any()) {
    tooltips.forEach((tooltip) => {
      const number = tooltip.querySelector(".tooltip__number");
      const content = tooltip.querySelector(".tooltip__content");
      number.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".tooltip__content.--active").forEach((el) => {
          if (el !== content) {
            el.classList.remove("--active");
          }
        });
        content.classList.toggle("--active");
      });
    });
    document.addEventListener("click", () => {
      removeAllActiveTooltips();
    });
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      removeAllActiveTooltips();
    }
  });
});
const picture = document.querySelector(".product-hero__picture");
let lastScrollY = window.scrollY;
let currentX = 0;
let isDesktop = window.innerWidth > 991;
function handleScroll() {
  if (!isDesktop) return;
  const currentScroll = window.scrollY;
  const delta = currentScroll - lastScrollY;
  currentX -= delta / 4;
  picture.style.setProperty("--line-offset-x", `${currentX}px`);
  lastScrollY = currentScroll;
}
function handleResize() {
  isDesktop = window.innerWidth > 991;
  if (!isDesktop) {
    picture.style.removeProperty("--line-offset-x");
    currentX = 0;
    lastScrollY = window.scrollY;
  }
}
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
