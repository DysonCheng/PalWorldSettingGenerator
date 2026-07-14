(function () {
  var SHOW_OFFSET = 520;
  var HIDE_DELAY = 180;

  function initBackToTop() {
    var button = document.getElementById("backToTopButton");
    var hideTimer;

    if (!button) {
      return;
    }

    function setVisible(visible) {
      window.clearTimeout(hideTimer);

      if (visible) {
        button.hidden = false;
        button.setAttribute("aria-hidden", "false");
        window.requestAnimationFrame(function () {
          button.classList.add("is-visible");
        });
        return;
      }

      button.classList.remove("is-visible");
      button.setAttribute("aria-hidden", "true");
      hideTimer = window.setTimeout(function () {
        if (!button.classList.contains("is-visible")) {
          button.hidden = true;
        }
      }, HIDE_DELAY);
    }

    function updateVisibility() {
      setVisible(window.scrollY > SHOW_OFFSET);
    }

    button.addEventListener("click", function () {
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
  }

  document.addEventListener("DOMContentLoaded", initBackToTop);
})();
