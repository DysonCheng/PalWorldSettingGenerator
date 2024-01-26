  // 定義重設值的函數
  function resetValue(elementId) {
    // 取得元素
    var numberInput = document.getElementById(elementId);
    var sliderInput = document.getElementById("slider" + elementId);

    // 恢復預設值
    numberInput.value = numberInput.defaultValue;
    sliderInput.value = sliderInput.defaultValue;

    // 更新顯示的數值
    updateInputValue(elementId, "slider" + elementId);
  }

  // 定義更新輸入值的函數
  function updateInputValue(elementId, sliderId) {
    // 取得元素
    var numberInput = document.getElementById(elementId);
    var sliderInput = document.getElementById(sliderId);

    // 更新顯示的數值
    numberInput.value = sliderInput.value;
  }
