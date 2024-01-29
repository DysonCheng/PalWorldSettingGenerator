document.addEventListener("DOMContentLoaded", function () {
  var HiddenArea = document.getElementById("HiddenArea");

  var isVisible = false;

  function isScrollPositionReached() {
    var triggerPosition = 550;

    return window.scrollY >= triggerPosition;
  }

  function handleScroll() {
    var currentVisibility = isScrollPositionReached();

    if (currentVisibility !== isVisible) {
      isVisible = currentVisibility;

      if (isVisible) {
        document.querySelector(".scrollable-area").classList.add("visible");
        HiddenArea.classList.remove("HiddenArea");
      } else {
        document.querySelector(".scrollable-area").classList.remove("visible");
        HiddenArea.classList.add("HiddenArea");
      }
    }
  }
  window.addEventListener("scroll", handleScroll);

  handleScroll();
});
