(function () {
  var GROUP_STATE_KEY = "palworldSettingGenerator.groupState.v1";
  var LEGACY_ORDER_KEYS = [
    "palworldSettingGenerator.utilityModuleOrder.v1",
    "palworldSettingGenerator.settingGroupOrder.v1"
  ];

  function clearLegacyOrderState() {
    try {
      LEGACY_ORDER_KEYS.forEach(function (key) {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn(error);
    }
  }

  function getGroupState() {
    try {
      return JSON.parse(localStorage.getItem(GROUP_STATE_KEY)) || {};
    } catch (error) {
      console.warn(error);
      return {};
    }
  }

  function setGroupState(groupId, isOpen) {
    var state = getGroupState();
    state[groupId] = Boolean(isOpen);
    localStorage.setItem(GROUP_STATE_KEY, JSON.stringify(state));
  }

  function createElement(tagName, attributes, textContent) {
    var element = document.createElement(tagName);
    Object.keys(attributes || {}).forEach(function (name) {
      if (attributes[name] !== undefined && attributes[name] !== null) {
        element.setAttribute(name, attributes[name]);
      }
    });
    if (textContent !== undefined) {
      element.textContent = textContent;
    }
    return element;
  }

  function getFieldId(key) {
    return "setting-" + key;
  }

  function getOptionId(key, value) {
    return "setting-" + key + "-" + value;
  }

  function createBooleanControl(field) {
    var wrapper = createElement("div", { class: "field-options" });

    window.settingsSchema.boolOptions.forEach(function (option) {
      var id = getOptionId(field.key, option.value);
      var input = createElement("input", {
        type: "radio",
        id: id,
        name: field.key,
        value: option.value
      });
      if (option.value === field.defaultValue) {
        input.checked = true;
      }

      var label = createElement("label", {
        for: id,
        "data-i18n": "boolean." + option.value
      }, option.label);
      wrapper.appendChild(input);
      wrapper.appendChild(label);
    });

    return wrapper;
  }

  function createEnumControl(field) {
    var select = createElement("select", {
      id: getFieldId(field.key),
      name: field.key,
      "data-default": field.defaultValue
    });

    field.options.forEach(function (optionValue) {
      var option = createElement("option", {
        value: optionValue,
        "data-i18n": "enum." + field.key + "." + optionValue
      }, optionValue);
      if (optionValue === field.defaultValue) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    return select;
  }

  function getListTokens(field) {
    return window.formState
      ? window.formState.parseListValue(field.defaultValue)
      : [];
  }

  function setListValue(hidden, field, tokens) {
    hidden.value = window.formState
      ? window.formState.formatListValue(field, tokens)
      : tokens.join(",");
    hidden.dispatchEvent(new Event("input", { bubbles: true }));
    hidden.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function createListControl(field) {
    var wrapper = createElement("div", { class: "list-control" });
    var hidden = createElement("input", {
      type: "hidden",
      id: getFieldId(field.key),
      name: field.key,
      value: field.defaultValue,
      "data-default": field.defaultValue
    });
    var defaultTokens = getListTokens(field);

    wrapper.appendChild(hidden);
    field.options.forEach(function (optionValue) {
      var id = getOptionId(field.key, optionValue);
      var option = createElement("input", {
        type: "checkbox",
        id: id,
        value: optionValue
      });
      option.checked = defaultTokens.indexOf(optionValue) !== -1;
      option.addEventListener("change", function () {
        var tokens = Array.prototype.map.call(
          wrapper.querySelectorAll('input[type="checkbox"]:checked'),
          function (checkbox) {
            return checkbox.value;
          }
        );
        setListValue(hidden, field, tokens);
      });

      wrapper.appendChild(option);
      wrapper.appendChild(createElement("label", { for: id, translate: "no" }, optionValue));
    });

    document.addEventListener("field-list-value:set", function (event) {
      if (!event.detail || event.detail.key !== field.key) {
        return;
      }
      var tokens = window.formState ? window.formState.parseListValue(event.detail.value) : [];
      Array.prototype.forEach.call(wrapper.querySelectorAll('input[type="checkbox"]'), function (checkbox) {
        checkbox.checked = tokens.indexOf(checkbox.value) !== -1;
      });
    });

    return wrapper;
  }

  function createTagListControl(field) {
    var wrapper = createElement("div", { class: "tag-list-control" });
    var hidden = createElement("input", {
      type: "hidden",
      id: getFieldId(field.key),
      name: field.key,
      value: field.defaultValue,
      "data-default": field.defaultValue
    });
    var tags = createElement("div", { class: "tag-list-control__tags" });
    var input = createElement("input", {
      type: "text",
      class: "tag-list-control__input",
      "data-i18n-placeholder": "tools.tagPlaceholder",
      placeholder: "Technology ID"
    });
    var addButton = createElement("button", {
      type: "button",
      class: "tag-list-control__add",
      "data-i18n": "actions.add"
    }, "Add");

    function renderTags() {
      var tokens = window.formState ? window.formState.parseListValue(hidden.value) : [];
      tags.innerHTML = "";
      tokens.forEach(function (token) {
        var tag = createElement("button", {
          type: "button",
          class: "tag-list-control__tag",
          title: token
        }, token + " x");
        tag.addEventListener("click", function () {
          setListValue(hidden, field, tokens.filter(function (item) {
            return item !== token;
          }));
          renderTags();
        });
        tags.appendChild(tag);
      });
    }

    function addTokens() {
      var current = window.formState ? window.formState.parseListValue(hidden.value) : [];
      var next = current.concat(input.value.split(",").map(function (token) {
        return token.trim();
      }).filter(Boolean));
      setListValue(hidden, field, next);
      input.value = "";
      renderTags();
    }

    addButton.addEventListener("click", addTokens);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addTokens();
      }
    });

    document.addEventListener("field-list-value:set", function (event) {
      if (event.detail && event.detail.key === field.key) {
        renderTags();
      }
    });

    wrapper.appendChild(hidden);
    wrapper.appendChild(tags);
    wrapper.appendChild(input);
    wrapper.appendChild(addButton);
    renderTags();
    return wrapper;
  }

  function toNumber(value, fallback) {
    var number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function decimalPlaces(value) {
    var stringValue = String(value || "");
    if (stringValue.indexOf("e-") !== -1) {
      return Number(stringValue.split("e-")[1]) || 0;
    }
    var match = stringValue.match(/\.(\d+)/);
    return match ? match[1].length : 0;
  }

  function getNumberPrecision(field) {
    return Math.min(
      6,
      Math.max(decimalPlaces(field.defaultValue), decimalPlaces(field.step || "1"))
    );
  }

  function formatNumberValue(field, value) {
    var number = Number(value);
    if (!Number.isFinite(number)) {
      return value;
    }

    var precision = getNumberPrecision(field);
    if (precision > 0) {
      return number.toFixed(precision);
    }
    return String(Math.round(number));
  }

  function normalizeBoundary(value, step, direction) {
    if (!Number.isFinite(value)) {
      return value;
    }
    if (!Number.isFinite(step) || step <= 0) {
      return value;
    }

    var scaled = direction === "min"
      ? Math.floor(value / step) * step
      : Math.ceil(value / step) * step;
    return Number(scaled.toFixed(Math.min(6, decimalPlaces(step))));
  }

  function getSliderMax(field, defaultValue, step) {
    if (field.max !== undefined) {
      return toNumber(field.max, defaultValue);
    }

    if (/Port$/.test(field.key)) {
      return 65535;
    }
    if (field.key === "DropItemMaxNum_UNKO") {
      return 500;
    }
    if (field.key === "DropItemMaxNum" || field.key === "PhysicsActiveDropItemMaxNum") {
      return 5000;
    }
    if (field.key === "MaxBuildingLimitNum") {
      return 10000;
    }
    if (field.key === "BaseCampMaxNum") {
      return 256;
    }
    if (field.key === "BaseCampWorkerMaxNum") {
      return 50;
    }
    if (/(CoopPlayerMaxNum|ServerPlayerMaxNum|GuildPlayerMaxNum)$/.test(field.key)) {
      return 128;
    }
    if (/Distance$/.test(field.key)) {
      return Math.max(defaultValue * 2, 10000);
    }
    if (/Rate$/.test(field.key) || /Multiplier$/.test(field.key) || /TimeScale$/.test(field.key)) {
      return Math.max(5, defaultValue * 5, step * 20);
    }
    if (step >= 100) {
      return Math.max(defaultValue * 2, step * 50);
    }
    if (step >= 60) {
      return Math.max(defaultValue * 2, step * 60);
    }
    if (step >= 10) {
      return Math.max(defaultValue * 5, step * 50);
    }
    if (step >= 1) {
      if (defaultValue <= 5) {
        return 10;
      }
      if (defaultValue <= 20) {
        return 50;
      }
      if (defaultValue <= 100) {
        return 200;
      }
      return defaultValue * 2;
    }

    return Math.max(5, defaultValue * 5, step * 50);
  }

  function getSliderBounds(field) {
    var step = Math.abs(toNumber(field.step, 0.1)) || 0.1;
    var defaultValue = toNumber(field.defaultValue, 0);
    var min = field.min !== undefined
      ? toNumber(field.min, 0)
      : (defaultValue < 0 ? defaultValue : 0);
    var max = getSliderMax(field, Math.abs(defaultValue), step);

    if (max <= min) {
      max = min + step * 10;
    }

    return {
      min: normalizeBoundary(min, step, "min"),
      max: normalizeBoundary(max, step, "max"),
      step: step
    };
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function syncSliderBounds(slider, value, step) {
    var min = toNumber(slider.min, value);
    var max = toNumber(slider.max, value);
    if (value < min) {
      slider.min = String(normalizeBoundary(value, step, "min"));
    }
    if (value > max) {
      slider.max = String(normalizeBoundary(value, step, "max"));
    }
  }

  function createNumberControl(field) {
    var bounds = getSliderBounds(field);
    var input = createElement("input", {
      type: "number",
      id: getFieldId(field.key),
      name: field.key,
      value: field.defaultValue,
      "data-default": field.defaultValue,
      step: field.step || String(bounds.step),
      min: field.min,
      max: field.max,
      inputmode: "decimal",
      class: "lightbar number-control__input"
    });
    var defaultValue = toNumber(field.defaultValue, bounds.min);
    var slider = createElement("input", {
      type: "range",
      id: "slider" + getFieldId(field.key),
      class: "lightbar number-control__slider",
      min: bounds.min,
      max: bounds.max,
      step: bounds.step,
      value: clamp(defaultValue, bounds.min, bounds.max),
      "data-number-input": getFieldId(field.key),
      "aria-label": field.label + " slider"
    });
    var wrapper = createElement("div", { class: "number-control" });

    function syncSliderFromInput() {
      var value = Number(input.value);
      if (!Number.isFinite(value)) {
        return;
      }
      syncSliderBounds(slider, value, bounds.step);
      slider.value = String(clamp(value, toNumber(slider.min, value), toNumber(slider.max, value)));
    }

    slider.addEventListener("input", function () {
      input.value = formatNumberValue(field, slider.value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    slider.addEventListener("change", function () {
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    input.addEventListener("input", syncSliderFromInput);
    input.addEventListener("change", syncSliderFromInput);

    wrapper.appendChild(input);
    wrapper.appendChild(slider);
    return wrapper;
  }

  function createTextControl(field) {
    var inputType = field.type === "number" ? "number" : "text";
    if (field.type === "number") {
      return createNumberControl(field);
    }

    var input = createElement("input", {
      type: inputType,
      id: getFieldId(field.key),
      name: field.key,
      value: field.defaultValue,
      "data-default": field.defaultValue
    });

    return input;
  }

  function createControl(field) {
    if (field.type === "boolean") {
      return createBooleanControl(field);
    }
    if (field.type === "enum") {
      return createEnumControl(field);
    }
    if (field.type === "list") {
      return createListControl(field);
    }
    if (field.type === "tagList") {
      return createTagListControl(field);
    }
    return createTextControl(field);
  }

  function createResetButton(field) {
    var button = createElement("button", {
      type: "button",
      class: "reset-btn",
      "data-reset-key": field.key,
      title: "Reset"
    }, "↺");
    button.addEventListener("click", function () {
      resetValue(field.key);
    });
    return button;
  }

  function createFieldRow(field) {
    var row = createElement("tr", { class: "setting-row", "data-setting-key": field.key });

    row.appendChild(createElement("td", { translate: "no", title: field.key }, field.key));

    var labelCell = createElement("td");
    labelCell.appendChild(createElement("span", {
      "data-i18n": "settings." + field.key,
      "data-setting-label": field.key
    }, field.label));
    labelCell.appendChild(createElement("span", {
      class: "setting-row__modified",
      "data-i18n": "tools.modifiedBadge",
      hidden: "hidden"
    }, "Modified"));
    row.appendChild(labelCell);

    var controlCell = createElement("td");
    controlCell.appendChild(createControl(field));
    controlCell.appendChild(createResetButton(field));
    row.appendChild(controlCell);

    return row;
  }

  function createGroup(group, fields, index, savedState) {
    var details = createElement("details", {
      class: "settings-group",
      "data-group-id": group.id
    });

    var isOpen = Object.prototype.hasOwnProperty.call(savedState, group.id)
      ? savedState[group.id]
      : index === 0;
    details.open = Boolean(isOpen);

    var summary = createElement("summary", { class: "settings-group__summary" });
    var title = createElement("span", { class: "settings-group__title" });
    title.appendChild(createElement("strong", { "data-i18n": "groups." + group.id + ".label" }, group.label));
    title.appendChild(createElement("small", { "data-i18n": "groups." + group.id + ".description" }, group.description));
    summary.appendChild(title);
    summary.appendChild(createElement("span", { class: "settings-group__count" }, String(fields.length)));
    details.appendChild(summary);

    var table = createElement("table", { class: "settings-group__table" });
    fields.forEach(function (field) {
      table.appendChild(createFieldRow(field));
    });
    details.appendChild(table);

    details.addEventListener("toggle", function () {
      setGroupState(group.id, details.open);
    });

    return details;
  }

  function renderSettingsForm() {
    var form = document.getElementById("settingsForm");
    if (!form || !window.settingsSchema) {
      return;
    }

    var savedState = getGroupState();
    clearLegacyOrderState();
    form.innerHTML = "";
    form.classList.add("settings-form");

    window.settingsSchema.groups.forEach(function (group, index) {
      var fields = window.settingsSchema.fields.filter(function (field) {
        return field.group === group.id;
      });
      form.appendChild(createGroup(group, fields, index, savedState));
    });

    if (typeof initializeAllElements === "function") {
      initializeAllElements();
    }

    if (!form.dataset.stateListenerAttached) {
      form.addEventListener("input", function () {
        if (window.formState) {
          window.formState.refreshChangedState();
        }
      });
      form.addEventListener("change", function () {
        if (window.formState) {
          window.formState.refreshChangedState();
        }
      });
      form.dataset.stateListenerAttached = "true";
    }

    if (window.formState) {
      window.formState.refreshChangedState();
    }

    document.dispatchEvent(new CustomEvent("settings-form:rendered"));
  }

  document.addEventListener("DOMContentLoaded", renderSettingsForm);

  window.settingsForm = {
    render: renderSettingsForm,
    getFieldId: getFieldId
  };
})();
