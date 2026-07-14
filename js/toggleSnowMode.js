var THEME_STORAGE_KEY = "palworldSettingGenerator.theme";

function setSnowMode(enabled) {
  var container = document.getElementById("container");
  var body = document.body;
  if (!body) {
    return;
  }

  body.classList.toggle("snow-mode", enabled);
  if (container) {
    container.classList.remove("snow-mode");
  }

  localStorage.setItem(THEME_STORAGE_KEY, enabled ? "snow" : "default");

}

function toggleSnowMode() {
  setSnowMode(!document.body.classList.contains("snow-mode"));
}

document.addEventListener("DOMContentLoaded", function () {
  setSnowMode(localStorage.getItem(THEME_STORAGE_KEY) === "snow");
});
