function parseConfig() {
  var configText = document.getElementById("configField").value;
  var regex = /\(([^)]+)\)/;
  var matches = regex.exec(configText);

  if (matches && matches.length > 1) {
      var configLines = matches[1].split(',');

      configLines.forEach(function (line) {
          var keyValue = line.split('=');

          if (keyValue.length === 2) {
              var key = keyValue[0].trim();
              var value = keyValue[1].trim().replace(/["']/g, '');

              var inputElement = document.getElementsByName(key)[0];

              if (inputElement) {
                  var defaultValue = inputElement.defaultValue;

                  if (inputElement.type === "radio") {
                      var radioButtons = document.getElementsByName(key);
                      for (var i = 0; i < radioButtons.length; i++) {
                          if (radioButtons[i].value === value) {
                              radioButtons[i].checked = true;
                              break;
                          }
                      }
                  } else {
                      inputElement.value = value;

                      
                      if (value != defaultValue) {
                          inputElement.style.backgroundColor = 'pink';
                      } else {                      
                          inputElement.style.backgroundColor = '';
                      }
                  }

                  console.log("Variable Name:", key, "Value:", value);
              }
          }
      });

      document.getElementById("configField").value = '';

      var notification = document.getElementById('notification2');
      notification.style.opacity = 1;
      setTimeout(function () {
          notification.style.opacity = 0;
      }, 1500);
  }
}
