  function resetValue(elementId) {
    var numberInput = document.getElementById(elementId);
    var sliderInput = document.getElementById("slider" + elementId);
    numberInput.value = numberInput.defaultValue;
    sliderInput.value = sliderInput.defaultValue;
    updateInputValue(elementId, "slider" + elementId);
  }
  function updateInputValue(elementId, sliderId) {
    var numberInput = document.getElementById(elementId);
    var sliderInput = document.getElementById(sliderId);
    numberInput.value = sliderInput.value;
  }
