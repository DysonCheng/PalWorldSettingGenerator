(function () {
  function initAutoHideToolbar() {
    var toolbar = document.getElementById("HiddenArea");
    if (!toolbar) {
      return;
    }

    var closeTimer = null;

    function cancelClose() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function openToolbar() {
      cancelClose();
      toolbar.classList.add("is-open");
    }

    function closeToolbar() {
      cancelClose();
      if (toolbar.contains(document.activeElement)) {
        return;
      }
      toolbar.classList.remove("is-open");
    }

    function scheduleClose() {
      cancelClose();
      closeTimer = window.setTimeout(closeToolbar, 700);
    }

    toolbar.addEventListener("pointerenter", openToolbar);
    toolbar.addEventListener("pointerleave", scheduleClose);
    toolbar.addEventListener("focusin", openToolbar);
    toolbar.addEventListener("focusout", scheduleClose);
    toolbar.addEventListener("click", openToolbar);

    document.addEventListener("pointerdown", function (event) {
      if (!toolbar.contains(event.target)) {
        closeToolbar();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeToolbar();
      }
    });

    window.addEventListener("scroll", closeToolbar, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", initAutoHideToolbar);
})();
