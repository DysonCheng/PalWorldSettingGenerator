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

  function createTextControl(field) {
    var inputType = field.type === "number" ? "number" : "text";
    var input = createElement("input", {
      type: inputType,
      id: getFieldId(field.key),
      name: field.key,
      value: field.defaultValue,
      "data-default": field.defaultValue
    });

    if (field.type === "number") {
      input.setAttribute("step", field.step || "0.1");
      if (field.min !== undefined) {
        input.setAttribute("min", field.min);
      }
      if (field.max !== undefined) {
        input.setAttribute("max", field.max);
      }
      input.classList.add("lightbar");
    }

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

    row.appendChild(createElement("td", { translate: "no" }, field.key));

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
