function getSchemaFields() {
  return window.formState ? window.formState.getFields() : [];
}

function escapeConfigString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function getFieldValue(field) {
  return window.formState ? window.formState.getFieldValue(field) : field.defaultValue;
}

function formatFieldValue(field, value) {
  if (field.type === "string") {
    return '"' + escapeConfigString(value) + '"';
  }
  return value;
}

function buildSettingsContent() {
  var fieldsByKey = {};
  getSchemaFields().forEach(function (field) {
    fieldsByKey[field.key] = field;
  });

  var orderedFields = (window.settingsSchema.outputOrder || []).map(function (key) {
    return fieldsByKey[key];
  }).filter(Boolean);
  if (!orderedFields.length) {
    orderedFields = getSchemaFields();
  }

  var settings = orderedFields.map(function (field) {
    var value = getFieldValue(field);
    return field.key + "=" + formatFieldValue(field, value);
  });

  return "[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(" + settings.join(",") + ")";
}

function showNotification(elementId) {
  var notification = document.getElementById(elementId);
  if (!notification) {
    return;
  }

  notification.style.opacity = 1;
  setTimeout(function () {
    notification.style.opacity = 0;
  }, 1500);
}

function generateSettings() {
  copyCodeToClipboard(buildSettingsContent());
  showNotification("notification");
}

function copyCodeToClipboard(code) {
  var textarea = document.createElement("textarea");
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;
  textarea.value = code;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function SaveSettings() {
  var settingsContent = buildSettingsContent();
  var blob = new Blob([settingsContent], { type: "text/plain" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "PalWorldSettings.ini";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.buildSettingsContent = buildSettingsContent;
