import "./app.min2.js";
/* empty css           */
import "./custom.min.js";
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector(".game-preview__button");
  const overlay = document.querySelector(".game-preview__overlay");
  const iframeWrap = document.querySelector(".game-preview__iframe-wrap");
  if (button && overlay && iframeWrap) {
    button.addEventListener("click", () => {
      overlay.style.display = "none";
      iframeWrap.style.display = "block";
    });
  }
});
