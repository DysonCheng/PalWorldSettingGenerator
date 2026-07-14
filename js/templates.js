(function () {
  var templates = {
    casualPve: {
      descriptionKey: "templates.casualPve.description",
      fallbackDescription: "Relaxed PvE settings with faster progress and lighter penalties.",
      values: {
        Difficulty: "None",
        ExpRate: "2.000000",
        PalCaptureRate: "2.000000",
        CollectionDropRate: "2.000000",
        EnemyDropItemRate: "1.500000",
        WorkSpeedRate: "2.000000",
        PalEggDefaultHatchingTime: "0.500000",
        DeathPenalty: "None",
        bEnableInvaderEnemy: "False",
        bIsPvP: "False"
      }
    },
    hardcore: {
      descriptionKey: "templates.hardcore.description",
      fallbackDescription: "High-risk survival settings with harsher death and slower growth.",
      values: {
        Difficulty: "Difficult",
        ExpRate: "0.800000",
        PalCaptureRate: "0.800000",
        PlayerDamageRateDefense: "1.500000",
        PalDamageRateAttack: "1.300000",
        DeathPenalty: "All",
        bHardcore: "True",
        bPalLost: "True",
        bCharacterRecreateInHardcore: "True",
        bEnableFastTravel: "False"
      }
    },
    pvp: {
      descriptionKey: "templates.pvp.description",
      fallbackDescription: "PvP-ready settings with combat, map visibility, and player-kill drops.",
      values: {
        bIsMultiplay: "True",
        bIsPvP: "True",
        bEnablePlayerToPlayerDamage: "True",
        bEnableFriendlyFire: "True",
        bDisplayPvPItemNumOnWorldMap_BaseCamp: "True",
        bDisplayPvPItemNumOnWorldMap_Player: "True",
        bAdditionalDropItemWhenPlayerKillingInPvPMode: "True",
        AdditionalDropItemWhenPlayerKillingInPvPMode: "PlayerDropItem",
        AdditionalDropItemNumWhenPlayerKillingInPvPMode: "1"
      }
    },
    boosted: {
      descriptionKey: "templates.boosted.description",
      fallbackDescription: "Fast, high-reward settings for short sessions and rapid testing.",
      values: {
        ExpRate: "5.000000",
        PalCaptureRate: "3.000000",
        PalSpawnNumRate: "1.500000",
        CollectionDropRate: "3.000000",
        EnemyDropItemRate: "3.000000",
        WorkSpeedRate: "5.000000",
        PalEggDefaultHatchingTime: "0.100000",
        PlayerStomachDecreaceRate: "0.500000",
        PalStomachDecreaceRate: "0.500000"
      }
    },
    stableDedicated: {
      descriptionKey: "templates.stableDedicated.description",
      fallbackDescription: "Conservative dedicated-server settings that reduce item and replication load.",
      values: {
        DropItemMaxNum: "1500",
        PhysicsActiveDropItemMaxNum: "500",
        DropItemAliveMaxHours: "0.500000",
        AutoSaveSpan: "60.000000",
        ServerPlayerMaxNum: "32",
        BaseCampMaxNum: "128",
        ServerReplicatePawnCullDistance: "12000.000000",
        bShowPlayerList: "True",
        LogFormatType: "Text"
      }
    }
  };

  var templateSelect;
  var applyButton;
  var descriptionElement;
  var statusElement;

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

  function getSelectedTemplate() {
    return templateSelect ? templates[templateSelect.value] : null;
  }

  function updateDescription() {
    var template = getSelectedTemplate();
    if (!descriptionElement || !template) {
      return;
    }
    descriptionElement.textContent = tr(template.descriptionKey, template.fallbackDescription);
  }

  function applyTemplate() {
    var template = getSelectedTemplate();
    if (!template || !window.formState) {
      return;
    }

    window.formState.applyValues(template.values);
    if (window.editorTools) {
      window.editorTools.applyFilters();
    }
    if (statusElement) {
      var selectedOption = templateSelect.options[templateSelect.selectedIndex];
      statusElement.textContent = tr("templates.applied", 'Applied "{name}".', {
        name: selectedOption ? selectedOption.textContent : templateSelect.value
      });
    }
  }

  function init() {
    templateSelect = document.getElementById("templateSelect");
    applyButton = document.getElementById("applyTemplateButton");
    descriptionElement = document.getElementById("templateDescription");
    statusElement = document.getElementById("templateStatus");

    if (!templateSelect || !applyButton) {
      return;
    }

    templateSelect.addEventListener("change", updateDescription);
    applyButton.addEventListener("click", applyTemplate);
    document.addEventListener("i18n:change", updateDescription);
    updateDescription();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.settingTemplates = templates;
})();
