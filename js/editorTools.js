(function () {
  var searchInput;
  var modifiedOnlyToggle;
  var clearFiltersButton;
  var filterResultText;
  var expandAllButton;
  var collapseAllButton;

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

  function getRows() {
    return Array.prototype.slice.call(document.querySelectorAll(".setting-row"));
  }

  function getRowSearchText(row) {
    var key = row.getAttribute("data-setting-key") || "";
    return [
      key,
      row.textContent || ""
    ].join(" ").toLowerCase();
  }

  function isModifiedOnlyActive() {
    return modifiedOnlyToggle ? modifiedOnlyToggle.getAttribute("aria-pressed") === "true" : false;
  }

  function setModifiedOnlyActive(active) {
    if (!modifiedOnlyToggle) {
      return;
    }

    modifiedOnlyToggle.setAttribute("aria-pressed", active ? "true" : "false");
    modifiedOnlyToggle.classList.toggle("is-active", Boolean(active));
  }

  function updateGroupVisibility(hasActiveFilter) {
    Array.prototype.forEach.call(document.querySelectorAll(".settings-group"), function (group) {
      var rows = Array.prototype.slice.call(group.querySelectorAll(".setting-row"));
      var visibleRows = rows.filter(function (row) {
        return !row.hidden;
      });
      group.hidden = visibleRows.length === 0;
      if (hasActiveFilter && visibleRows.length > 0) {
        group.open = true;
      }

      var count = group.querySelector(".settings-group__count");
      if (count) {
        count.textContent = hasActiveFilter
          ? visibleRows.length + "/" + rows.length
          : String(rows.length);
      }
    });
  }

  function applyFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var modifiedOnly = isModifiedOnlyActive();
    var rows = getRows();
    var visibleCount = 0;
    var modifiedCount = 0;

    rows.forEach(function (row) {
      var key = row.getAttribute("data-setting-key");
      var field = window.formState ? window.formState.getField(key) : null;
      var modified = field && window.formState ? window.formState.isModified(field) : false;
      var matchesSearch = !query || getRowSearchText(row).indexOf(query) !== -1;
      var visible = matchesSearch && (!modifiedOnly || modified);

      row.hidden = !visible;
      row.classList.toggle("is-filtered-out", !visible);
      if (visible) {
        visibleCount += 1;
      }
      if (modified) {
        modifiedCount += 1;
      }
    });

    updateGroupVisibility(Boolean(query || modifiedOnly));

    if (filterResultText) {
      filterResultText.textContent = tr(
        "tools.filterResult",
        "{visible}/{total} shown, {modified} modified.",
        {
          visible: visibleCount,
          total: rows.length,
          modified: modifiedCount
        }
      );
    }
  }

  function setAllGroups(open) {
    Array.prototype.forEach.call(document.querySelectorAll(".settings-group"), function (group) {
      if (!group.hidden) {
        group.open = open;
      }
    });
  }

  function clearFilters() {
    if (searchInput) {
      searchInput.value = "";
    }
    if (modifiedOnlyToggle) {
      setModifiedOnlyActive(false);
    }
    applyFilters();
  }

  function attachEvents() {
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }
    if (modifiedOnlyToggle) {
      modifiedOnlyToggle.addEventListener("click", function () {
        setModifiedOnlyActive(!isModifiedOnlyActive());
        applyFilters();
      });
    }
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", clearFilters);
    }
    if (expandAllButton) {
      expandAllButton.addEventListener("click", function () {
        setAllGroups(true);
      });
    }
    if (collapseAllButton) {
      collapseAllButton.addEventListener("click", function () {
        setAllGroups(false);
      });
    }

    document.addEventListener("settings-form:rendered", applyFilters);
    document.addEventListener("settings:modified-count", applyFilters);
    document.addEventListener("i18n:change", applyFilters);
  }

  function init() {
    searchInput = document.getElementById("settingSearch");
    modifiedOnlyToggle = document.getElementById("modifiedOnlyToggle");
    clearFiltersButton = document.getElementById("clearFiltersButton");
    filterResultText = document.getElementById("filterResultText");
    expandAllButton = document.getElementById("expandAllGroupsButton");
    collapseAllButton = document.getElementById("collapseAllGroupsButton");

    attachEvents();
    if (window.formState) {
      window.formState.refreshChangedState();
    }
    applyFilters();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.editorTools = {
    applyFilters: applyFilters,
    clearFilters: clearFilters
  };
})();
