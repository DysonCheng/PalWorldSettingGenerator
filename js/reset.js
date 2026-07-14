function resetValue(elementId) {
  if (window.formState) {
    window.formState.resetField(elementId);
    return;
  }

  var input = document.getElementById(elementId);
  if (!input) {
    return;
  }

  input.value = input.defaultValue;
  input.style.backgroundColor = "";
}

function updateInputValue(elementId, sliderId) {
  var numberInput = document.getElementById(elementId);
  var sliderInput = document.getElementById(sliderId);
  if (!numberInput || !sliderInput) {
    return;
  }
  numberInput.value = sliderInput.value;
}
