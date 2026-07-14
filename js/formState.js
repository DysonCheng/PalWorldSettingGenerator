(function () {
  function getFields() {
    return window.settingsSchema && window.settingsSchema.fields
      ? window.settingsSchema.fields
      : [];
  }

  function getField(key) {
    return getFields().find(function (field) {
      return field.key === key;
    });
  }

  function getInputId(key) {
    return window.settingsForm && window.settingsForm.getFieldId
      ? window.settingsForm.getFieldId(key)
      : "setting-" + key;
  }

  function getFieldElement(key) {
    return document.getElementById(getInputId(key)) || document.getElementsByName(key)[0];
  }

  function stripParentheses(value) {
    var trimmed = String(value || "").trim();
    if (trimmed[0] === "(" && trimmed[trimmed.length - 1] === ")") {
      return trimmed.slice(1, -1);
    }
    return trimmed;
  }

  function parseListValue(value) {
    var body = stripParentheses(value);
    if (!body) {
      return [];
    }

    return body.split(",").map(function (item) {
      return item.trim().replace(/^["']|["']$/g, "");
    }).filter(Boolean);
  }

  function uniqueValues(values) {
    var seen = {};
    return values.filter(function (value) {
      var key = String(value).toLowerCase();
      if (seen[key]) {
        return false;
      }
      seen[key] = true;
      return true;
    });
  }

  function formatListValue(field, values) {
    var tokens = uniqueValues(values || []);

    if (field && Array.isArray(field.options) && field.preserveOptionOrder) {
      var selected = {};
      tokens.forEach(function (token) {
        selected[token] = true;
      });
      tokens = field.options.filter(function (option) {
        return selected[option];
      });
    }

    if (!tokens.length) {
      return field && field.listStyle === "parenthesized" ? "()" : "";
    }

    if (field && field.listStyle === "raw") {
      return tokens.join(",");
    }

    return "(" + tokens.join(",") + ")";
  }

  function getFieldValue(fieldOrKey) {
    var field = typeof fieldOrKey === "string" ? getField(fieldOrKey) : fieldOrKey;
    if (!field) {
      return "";
    }

    if (field.type === "boolean") {
      var checked = document.querySelector('input[name="' + field.key + '"]:checked');
      return checked ? checked.value : field.defaultValue;
    }

    var element = getFieldElement(field.key);
    return element ? element.value : field.defaultValue;
  }

  function normalizeValue(field, value) {
    if (!field) {
      return String(value || "");
    }

    if (field.type === "list" || field.type === "tagList") {
      return formatListValue(field, parseListValue(value));
    }

    return String(value === undefined || value === null ? "" : value);
  }

  function setFieldValue(key, value, options) {
    var field = getField(key);
    if (!field) {
      return false;
    }

    if (field.type === "boolean") {
      var radio = document.querySelector('input[name="' + key + '"][value="' + value + '"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return Boolean(radio);
    }

    var element = getFieldElement(key);
    if (!element) {
      return false;
    }

    if (field.type === "list" || field.type === "tagList") {
      element.value = formatListValue(field, parseListValue(value));
      document.dispatchEvent(
        new CustomEvent("field-list-value:set", {
          detail: { key: key, value: element.value }
        })
      );
    } else {
      element.value = value;
    }

    if (!options || !options.silent) {
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    }

    return true;
  }

  function getValues() {
    var values = {};
    getFields().forEach(function (field) {
      values[field.key] = getFieldValue(field);
    });
    return values;
  }

  function applyValues(values) {
    Object.keys(values || {}).forEach(function (key) {
      setFieldValue(key, values[key]);
    });
    refreshChangedState();
  }

  function resetField(key) {
    var field = getField(key);
    if (!field) {
      return;
    }
    setFieldValue(key, field.defaultValue);
    refreshChangedState();
  }

  function isModified(field) {
    return normalizeValue(field, getFieldValue(field)) !== normalizeValue(field, field.defaultValue);
  }

  function refreshChangedState() {
    var modifiedCount = 0;

    getFields().forEach(function (field) {
      var modified = isModified(field);
      var row = document.querySelector('[data-setting-key="' + field.key + '"]');
      if (row) {
        row.classList.toggle("is-modified", modified);
        var badge = row.querySelector(".setting-row__modified");
        if (badge) {
          badge.hidden = !modified;
        }
      }
      if (modified) {
        modifiedCount += 1;
      }
    });

    document.dispatchEvent(
      new CustomEvent("settings:modified-count", {
        detail: { count: modifiedCount, total: getFields().length }
      })
    );

    return modifiedCount;
  }

  function getModifiedKeys() {
    return getFields().filter(isModified).map(function (field) {
      return field.key;
    });
  }

  window.formState = {
    applyValues: applyValues,
    formatListValue: formatListValue,
    getField: getField,
    getFieldElement: getFieldElement,
    getFieldValue: getFieldValue,
    getFields: getFields,
    getInputId: getInputId,
    getModifiedKeys: getModifiedKeys,
    getValues: getValues,
    isModified: isModified,
    normalizeValue: normalizeValue,
    parseListValue: parseListValue,
    refreshChangedState: refreshChangedState,
    resetField: resetField,
    setFieldValue: setFieldValue
  };
})();
