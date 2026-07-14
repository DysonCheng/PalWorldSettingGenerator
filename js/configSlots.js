(function () {
  var STORAGE_KEY = "palworldSettingGenerator.configSlots.v1";
  var SLOT_COUNT = 10;

  var slotSelect;
  var nameInput;
  var saveButton;
  var loadButton;
  var renameButton;
  var deleteButton;
  var statusElement;
  var compareASelect;
  var compareBSelect;
  var compareButton;
  var compareResult;

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

  function createEmptySlots() {
    var slots = [];
    for (var i = 0; i < SLOT_COUNT; i += 1) {
      slots.push({ name: "", updatedAt: "", values: null });
    }
    return slots;
  }

  function readSlots() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(parsed)) {
        return createEmptySlots();
      }

      var slots = createEmptySlots();
      parsed.slice(0, SLOT_COUNT).forEach(function (slot, index) {
        slots[index] = {
          name: typeof slot.name === "string" ? slot.name : "",
          updatedAt: typeof slot.updatedAt === "string" ? slot.updatedAt : "",
          values: slot.values && typeof slot.values === "object" ? slot.values : null
        };
      });
      return slots;
    } catch (error) {
      console.warn(error);
      return createEmptySlots();
    }
  }

  function writeSlots(slots) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }

  function getSelectedIndex() {
    return Math.max(0, Number(slotSelect.value || 0));
  }

  function defaultSlotName(index) {
    return tr("storage.slotLabel", "Slot") + " " + (index + 1);
  }

  function formatTimestamp(value) {
    if (!value) {
      return "";
    }

    try {
      return new Date(value).toLocaleString(window.i18n ? window.i18n.getLocale() : undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return value;
    }
  }

  function renderSlots(preserveStatus) {
    var slots = readSlots();
    var selectedIndex = getSelectedIndex();
    var compareAValue = compareASelect ? compareASelect.value : "0";
    var compareBValue = compareBSelect ? compareBSelect.value : "1";

    slotSelect.innerHTML = "";
    slots.forEach(function (slot, index) {
      var option = document.createElement("option");
      var slotName = getSlotDisplayName(slot, index);
      var timestamp = slot.updatedAt ? " - " + formatTimestamp(slot.updatedAt) : "";
      option.value = String(index);
      option.textContent = index + 1 + ". " + slotName + timestamp;
      slotSelect.appendChild(option);
    });

    slotSelect.value = String(Math.min(selectedIndex, SLOT_COUNT - 1));
    var currentSlot = slots[getSelectedIndex()];
    nameInput.value = currentSlot.name || "";
    loadButton.disabled = !currentSlot.values;
    deleteButton.disabled = !currentSlot.values && !currentSlot.name;
    renderCompareSelect(compareASelect, slots, compareAValue);
    renderCompareSelect(compareBSelect, slots, compareBValue);

    if (!preserveStatus) {
      statusElement.textContent = "";
    }
  }

  function getSlotDisplayName(slot, index) {
    return slot.name || (slot.values ? defaultSlotName(index) : tr("storage.emptySlot", "Empty slot"));
  }

  function renderCompareSelect(select, slots, selectedValue) {
    if (!select) {
      return;
    }

    select.innerHTML = "";
    slots.forEach(function (slot, index) {
      if (!slot.values) {
        return;
      }
      var option = document.createElement("option");
      option.value = String(index);
      option.textContent = index + 1 + ". " + getSlotDisplayName(slot, index);
      select.appendChild(option);
    });

    if (select.querySelector('option[value="' + selectedValue + '"]')) {
      select.value = selectedValue;
    }

    var canCompare = compareASelect && compareBSelect && compareASelect.options.length > 0 && compareBSelect.options.length > 0;
    if (compareButton) {
      compareButton.disabled = !canCompare;
    }
  }

  function serializeForm() {
    return window.formState ? window.formState.getValues() : {};
  }

  function applyValues(values) {
    if (window.formState) {
      window.formState.applyValues(values);
    }
  }

  function setStatus(key, fallback, replacements) {
    statusElement.textContent = tr(key, fallback, replacements);
  }

  function saveCurrentSlot() {
    var slots = readSlots();
    var index = getSelectedIndex();
    var name = nameInput.value.trim() || defaultSlotName(index);

    slots[index] = {
      name: name,
      updatedAt: new Date().toISOString(),
      values: serializeForm()
    };

    writeSlots(slots);
    renderSlots(true);
    setStatus("storage.saved", 'Saved "{name}".', { name: name });
  }

  function loadCurrentSlot() {
    var slots = readSlots();
    var index = getSelectedIndex();
    var slot = slots[index];

    if (!slot.values) {
      setStatus("storage.selectSavedSlot", "Select a saved slot first.");
      return;
    }

    applyValues(slot.values);
    setStatus("storage.loaded", 'Loaded "{name}".', {
      name: slot.name || defaultSlotName(index)
    });
  }

  function renameCurrentSlot() {
    var name = nameInput.value.trim();
    if (!name) {
      setStatus("storage.nameRequired", "Enter a backup name.");
      return;
    }

    var slots = readSlots();
    var index = getSelectedIndex();
    slots[index].name = name;
    writeSlots(slots);
    renderSlots(true);
    setStatus("storage.renamed", 'Renamed to "{name}".', { name: name });
  }

  function deleteCurrentSlot() {
    var slots = readSlots();
    var index = getSelectedIndex();
    slots[index] = { name: "", updatedAt: "", values: null };
    writeSlots(slots);
    renderSlots(true);
    setStatus("storage.deleted", "Cleared slot {slot}.", { slot: index + 1 });
  }

  function getFieldLabel(field) {
    return window.i18n && typeof window.i18n.t === "function"
      ? window.i18n.t("settings." + field.key, field.label)
      : field.label;
  }

  function showCompareResult(slotA, indexA, slotB, indexB) {
    if (!compareResult || !window.formState) {
      return;
    }

    var fields = window.formState.getFields();
    var differences = fields.filter(function (field) {
      var valueA = slotA.values && Object.prototype.hasOwnProperty.call(slotA.values, field.key)
        ? slotA.values[field.key]
        : field.defaultValue;
      var valueB = slotB.values && Object.prototype.hasOwnProperty.call(slotB.values, field.key)
        ? slotB.values[field.key]
        : field.defaultValue;
      return window.formState.normalizeValue(field, valueA) !== window.formState.normalizeValue(field, valueB);
    });

    compareResult.hidden = false;
    compareResult.innerHTML = "";

    var title = document.createElement("h4");
    title.textContent = tr("storage.compareResultTitle", "Backup comparison");
    compareResult.appendChild(title);

    var summary = document.createElement("p");
    summary.textContent = tr("storage.compareSummary", "{count} differences between {left} and {right}.", {
      count: differences.length,
      left: indexA + 1 + ". " + getSlotDisplayName(slotA, indexA),
      right: indexB + 1 + ". " + getSlotDisplayName(slotB, indexB)
    });
    compareResult.appendChild(summary);

    if (!differences.length) {
      return;
    }

    var table = document.createElement("table");
    table.className = "config-slots__diff-table";
    var header = document.createElement("tr");
    ["storage.compareField", "storage.compareLeft", "storage.compareRight"].forEach(function (key) {
      var th = document.createElement("th");
      th.textContent = tr(key, key);
      header.appendChild(th);
    });
    table.appendChild(header);

    differences.forEach(function (field) {
      var valueA = slotA.values && Object.prototype.hasOwnProperty.call(slotA.values, field.key)
        ? slotA.values[field.key]
        : field.defaultValue;
      var valueB = slotB.values && Object.prototype.hasOwnProperty.call(slotB.values, field.key)
        ? slotB.values[field.key]
        : field.defaultValue;
      var row = document.createElement("tr");
      var label = document.createElement("td");
      label.textContent = field.key + " - " + getFieldLabel(field);
      var left = document.createElement("td");
      left.textContent = valueA;
      var right = document.createElement("td");
      right.textContent = valueB;
      row.appendChild(label);
      row.appendChild(left);
      row.appendChild(right);
      table.appendChild(row);
    });

    compareResult.appendChild(table);
  }

  function compareSlots() {
    var currentCompareA = document.getElementById("configCompareA");
    var currentCompareB = document.getElementById("configCompareB");
    if (!currentCompareA || !currentCompareB) {
      return;
    }

    var slots = readSlots();
    var indexA = Number(currentCompareA.value);
    var indexB = Number(currentCompareB.value);
    var slotA = slots[indexA];
    var slotB = slots[indexB];

    if (!slotA || !slotA.values || !slotB || !slotB.values) {
      setStatus("storage.compareSelectSaved", "Select two saved slots.");
      return;
    }

    showCompareResult(slotA, indexA, slotB, indexB);
  }

  function attachEvents() {
    slotSelect.addEventListener("change", function () {
      renderSlots();
    });
    saveButton.addEventListener("click", saveCurrentSlot);
    loadButton.addEventListener("click", loadCurrentSlot);
    renameButton.addEventListener("click", renameCurrentSlot);
    deleteButton.addEventListener("click", deleteCurrentSlot);
    if (compareButton) {
      compareButton.addEventListener("click", compareSlots);
    }
    document.addEventListener("i18n:change", function () {
      renderSlots(true);
      if (compareResult && !compareResult.hidden && compareASelect && compareBSelect) {
        compareSlots();
      }
    });
  }

  function init() {
    slotSelect = document.getElementById("configSlotSelect");
    nameInput = document.getElementById("configSlotName");
    saveButton = document.getElementById("saveSlotButton");
    loadButton = document.getElementById("loadSlotButton");
    renameButton = document.getElementById("renameSlotButton");
    deleteButton = document.getElementById("deleteSlotButton");
    statusElement = document.getElementById("configSlotStatus");
    compareASelect = document.getElementById("configCompareA");
    compareBSelect = document.getElementById("configCompareB");
    compareButton = document.getElementById("compareSlotsButton");
    compareResult = document.getElementById("configCompareResult");

    if (!slotSelect || !nameInput || !saveButton || !loadButton || !renameButton || !deleteButton || !statusElement) {
      return;
    }

    attachEvents();
    renderSlots();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
