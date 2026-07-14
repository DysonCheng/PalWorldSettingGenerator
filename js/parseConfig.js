function extractOptionSettings(configText) {
  var marker = "OptionSettings=";
  var markerIndex = configText.indexOf(marker);
  if (markerIndex === -1) {
    return "";
  }

  var start = configText.indexOf("(", markerIndex + marker.length);
  if (start === -1) {
    return "";
  }

  var depth = 0;
  var quote = null;
  for (var i = start; i < configText.length; i += 1) {
    var character = configText[i];

    if (quote) {
      if (character === quote && configText[i - 1] !== "\\") {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth -= 1;
      if (depth === 0) {
        return configText.slice(start + 1, i);
      }
    }
  }

  return "";
}

function splitTopLevel(value) {
  var parts = [];
  var buffer = "";
  var depth = 0;
  var quote = null;

  for (var i = 0; i < value.length; i += 1) {
    var character = value[i];

    if (quote) {
      buffer += character;
      if (character === quote && value[i - 1] !== "\\") {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      buffer += character;
      continue;
    }

    if (character === "(") {
      depth += 1;
      buffer += character;
      continue;
    }

    if (character === ")") {
      depth -= 1;
      buffer += character;
      continue;
    }

    if (character === "," && depth === 0) {
      parts.push(buffer.trim());
      buffer = "";
      continue;
    }

    buffer += character;
  }

  if (buffer.trim()) {
    parts.push(buffer.trim());
  }

  return parts;
}

function unquoteConfigValue(value) {
  var trimmed = value.trim();
  if (
    (trimmed[0] === '"' && trimmed[trimmed.length - 1] === '"') ||
    (trimmed[0] === "'" && trimmed[trimmed.length - 1] === "'")
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return trimmed;
}

function findField(key) {
  return window.formState ? window.formState.getField(key) : null;
}

function setFieldValue(key, value) {
  if (window.formState) {
    return window.formState.setFieldValue(key, value);
  }
  return false;
}

function tr(key, fallback, replacements) {
  if (window.i18n && typeof window.i18n.format === "function") {
    return window.i18n.format(key, replacements || {}, fallback);
  }

  var value = fallback || key;
  Object.keys(replacements || {}).forEach(function (name) {
    value = value.replace(new RegExp("\\{" + name + "\\}", "g"), replacements[name]);
  });
  return value;
}

function appendList(parent, items, emptyText) {
  var list = document.createElement("ul");
  if (!items.length) {
    var emptyItem = document.createElement("li");
    emptyItem.textContent = emptyText;
    list.appendChild(emptyItem);
  } else {
    items.forEach(function (item) {
      var listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });
  }
  parent.appendChild(list);
}

function renderImportReport(report) {
  var panel = document.getElementById("importReport");
  var content = document.getElementById("importReportContent") || panel;
  if (!panel) {
    return;
  }

  panel.hidden = false;
  content.innerHTML = "";

  var summary = document.createElement("p");
  summary.textContent = tr(
    "importReport.summary",
    "Read {known} known settings, {unknown} unknown settings, {missing} missing settings.",
    {
      known: report.known.length,
      unknown: report.unknown.length,
      missing: report.missing.length
    }
  );
  content.appendChild(summary);

  [
    ["known", "importReport.known", "Known settings", report.known],
    ["unknown", "importReport.unknown", "Unknown settings", report.unknown],
    ["missing", "importReport.missing", "Missing settings", report.missing]
  ].forEach(function (section) {
    var details = document.createElement("details");
    details.open = section[0] !== "missing" && section[3].length > 0;
    var summaryElement = document.createElement("summary");
    summaryElement.textContent = tr(section[1], section[2]) + " (" + section[3].length + ")";
    details.appendChild(summaryElement);
    appendList(details, section[3], tr("importReport.none", "None"));
    content.appendChild(details);
  });
}

function parseConfig() {
  var configField = document.getElementById("configField");
  var optionSettings = extractOptionSettings(configField.value);

  if (!optionSettings) {
    renderImportReport({
      known: [],
      unknown: [],
      missing: window.formState ? window.formState.getFields().map(function (field) { return field.key; }) : []
    });
    return;
  }

  var known = [];
  var unknown = [];
  var seen = {};

  splitTopLevel(optionSettings).forEach(function (part) {
    var equalsIndex = part.indexOf("=");
    if (equalsIndex === -1) {
      return;
    }

    var key = part.slice(0, equalsIndex).trim();
    var value = unquoteConfigValue(part.slice(equalsIndex + 1));
    if (findField(key)) {
      if (setFieldValue(key, value)) {
        known.push(key);
        seen[key] = true;
      }
    } else {
      unknown.push(key);
    }
  });

  var missing = window.formState
    ? window.formState.getFields().map(function (field) {
        return field.key;
      }).filter(function (key) {
        return !seen[key];
      })
    : [];

  configField.value = "";
  if (window.formState) {
    window.formState.refreshChangedState();
  }
  renderImportReport({ known: known, unknown: unknown, missing: missing });
  showNotification("notification2");
}
