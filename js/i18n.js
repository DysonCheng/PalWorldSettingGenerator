(function () {
  var DEFAULT_LOCALE = "zh-TW";
  var STORAGE_KEY = "palworldSettingGenerator.locale";
  var CATALOG_URL = "locales/translations.json";

  var catalog = { defaultLocale: DEFAULT_LOCALE, locales: {} };
  var currentLocale = DEFAULT_LOCALE;
  var readyResolve;

  var OPTION_KEY_BY_ID = {
    Easy: "easy",
    Difficult: "difficult",
    None: "noneDefault",
    DeathPenaltyNone: "deathNone",
    DeathPenaltyItem: "deathItem",
    DeathPenaltyItemAndEquipment: "deathItemEquipment",
    DeathPenaltyAll: "deathAllDefault",
    bEnablePlayerToPlayerDamageTrue: "open",
    bEnablePlayerToPlayerDamageFalse: "closeDefault",
    bEnableFriendlyFireTrue: "open",
    bEnableFriendlyFireFalse: "closeDefault",
    bEnableInvaderEnemyTrue: "occurDefault",
    bEnableInvaderEnemyFalse: "notOccur",
    bActiveUNKOTrue: "enable",
    bActiveUNKOFalse: "closeDefault",
    bEnableAimAssistPadTrue: "enableDefault",
    bEnableAimAssistPadFalse: "close",
    bEnableAimAssistKeyboardTrue: "enable",
    bEnableAimAssistKeyboardFalse: "closeDefault",
    bAutoResetGuildNoOnlinePlayersTrue: "open",
    bAutoResetGuildNoOnlinePlayersFalse: "closeDefault",
    bIsMultiplayTrue: "open",
    bIsMultiplayFalse: "closeDefault",
    bIsPvPTrue: "open",
    bIsPvPFalse: "closeDefault",
    bCanPickupOtherGuildDeathPenaltyDropTrue: "allow",
    bCanPickupOtherGuildDeathPenaltyDropFalse: "notAllowDefault",
    bEnableNonLoginPenaltyTrue: "openDefault",
    bEnableNonLoginPenaltyFalse: "close",
    bEnableFastTravelTrue: "openDefault",
    bEnableFastTravelFalse: "close",
    bIsStartLocationSelectByMapTrue: "openDefault",
    bIsStartLocationSelectByMapFalse: "close",
    bExistPlayerAfterLogoutTrue: "open",
    bExistPlayerAfterLogoutFalse: "closeDefault",
    bEnableDefenseOtherGuildPlayerTrue: "yes",
    bEnableDefenseOtherGuildPlayerFalse: "noDefault",
    RCONEnabledTrue: "enable",
    RCONEnabledFalse: "disableDefault",
    bUseAuthTrue: "useDefault",
    bUseAuthFalse: "doNotUse"
  };

  var HINT_KEY_BY_SETTING = {
    DayTimeSpeedRate: "biggerDayShorter",
    NightTimeSpeedRate: "biggerNightShorter",
    ExpRate: "biggerLevelFaster",
    PalCaptureRate: "biggerChanceHigher",
    PalSpawnNumRate: "biggerQuantityMore",
    PalDamageRateAttack: "biggerAttackHigher",
    PalDamageRateDefense: "smallerLessDamage",
    PlayerDamageRateAttack: "biggerAttackHigher",
    PlayerDamageRateDefense: "smallerLessDamage",
    PlayerStomachDecreaceRate: "smallerLessHungry",
    PlayerStaminaDecreaceRate: "smallerStaminaSlower",
    PlayerAutoHPRegeneRate: "biggerHpRegenFaster",
    PlayerAutoHpRegeneRateInSleep: "biggerHpRegenMore",
    PalStomachDecreaceRate: "smallerLessHungry",
    PalStaminaDecreaceRate: "smallerStaminaSlower",
    PalAutoHPRegeneRate: "biggerHpRegenFaster",
    PalAutoHpRegeneRateInSleep: "biggerHpRegenMore",
    BuildObjectDamageRate: "biggerDamageMore",
    BuildObjectDeteriorationDamageRate: "smallerDecaySlower",
    CollectionDropRate: "biggerDropsMore",
    CollectionObjectHpRate: "biggerQuantityMore",
    CollectionObjectRespawnSpeedRate: "smallerRespawnFaster",
    EnemyDropItemRate: "biggerQuantityMore",
    DropItemMaxNum: "biggerDropsAllowed",
    DropItemMaxNum_UNKO: "biggerDropsAllowed",
    BaseCampMaxNum: "biggerBasesAllowed",
    BaseCampWorkerMaxNum: "biggerPalsAllowed",
    DropItemAliveMaxHours: "smallerDropsDisappearFaster",
    AutoResetGuildTimeNoOnlinePlayers: "smallerResetFaster",
    GuildPlayerMaxNum: "biggerPlayersAllowed",
    PalEggDefaultHatchingTime: "smallerHatchFaster",
    WorkSpeedRate: "biggerWorkFaster",
    CoopPlayerMaxNum: "biggerCoopAllowed",
    ServerPlayerMaxNum: "biggerCapacityAllowed"
  };

  function getValue(source, path) {
    return path.split(".").reduce(function (value, key) {
      return value && Object.prototype.hasOwnProperty.call(value, key)
        ? value[key]
        : undefined;
    }, source);
  }

  function getMessages(locale) {
    return catalog.locales[locale] || catalog.locales[catalog.defaultLocale] || {};
  }

  function t(path, fallback) {
    var translated = getValue(getMessages(currentLocale), path);
    if (translated === undefined) {
      translated = getValue(getMessages(catalog.defaultLocale), path);
    }
    if (translated === undefined && catalog.defaultLocale !== "en-US") {
      translated = getValue(getMessages("en-US"), path);
    }
    return translated === undefined ? fallback || path : translated;
  }

  function format(path, replacements, fallback) {
    var value = t(path, fallback);
    Object.keys(replacements || {}).forEach(function (key) {
      value = value.replace(new RegExp("\\{" + key + "\\}", "g"), replacements[key]);
    });
    return value;
  }

  function getSupportedLocales() {
    return Object.keys(catalog.locales);
  }

  function chooseInitialLocale() {
    var storedLocale = localStorage.getItem(STORAGE_KEY);
    var supportedLocales = getSupportedLocales();

    if (supportedLocales.indexOf(storedLocale) !== -1) {
      return storedLocale;
    }

    var browserLocale = navigator.language || "";
    var exactMatch = supportedLocales.indexOf(browserLocale);
    if (exactMatch !== -1) {
      return browserLocale;
    }

    var languagePrefix = browserLocale.split("-")[0];
    var prefixMatch = supportedLocales.find(function (locale) {
      return locale.split("-")[0] === languagePrefix;
    });

    if (prefixMatch) {
      return prefixMatch;
    }

    return catalog.defaultLocale || DEFAULT_LOCALE;
  }

  function applyDataAttributeTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = t(element.getAttribute("data-i18n"), element.textContent);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      element.setAttribute(
        "placeholder",
        t(element.getAttribute("data-i18n-placeholder"), element.getAttribute("placeholder") || "")
      );
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      element.setAttribute(
        "aria-label",
        t(element.getAttribute("data-i18n-aria-label"), element.getAttribute("aria-label") || "")
      );
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      element.setAttribute(
        "title",
        t(element.getAttribute("data-i18n-title"), element.getAttribute("title") || "")
      );
    });
  }

  function applySettingDescriptions() {
    document.querySelectorAll("#settingsForm tr").forEach(function (row) {
      var cells = row.children;
      if (cells.length < 2 || cells[0].getAttribute("translate") !== "no") {
        return;
      }

      var settingKey = cells[0].textContent.trim();
      var label = cells[1].querySelector("[data-setting-label]");
      if (label) {
        label.textContent = t("settings." + settingKey, label.textContent);
      } else {
        cells[1].textContent = t("settings." + settingKey, cells[1].textContent);
      }
    });
  }

  function applyOptionLabels() {
    Object.keys(OPTION_KEY_BY_ID).forEach(function (id) {
      var label = document.querySelector('label[for="' + id + '"]');
      if (!label) {
        return;
      }

      label.textContent = t("options." + OPTION_KEY_BY_ID[id], label.textContent);
    });
  }

  function applyResetHints() {
    document.querySelectorAll(".reset-btn").forEach(function (element) {
      var onclick = element.getAttribute("onclick") || "";
      var match = onclick.match(/resetValue\('([^']+)'\)/);
      if (!match) {
        return;
      }

      var hintKey = HINT_KEY_BY_SETTING[match[1]];
      if (hintKey) {
        element.textContent = t("hints." + hintKey, element.textContent);
      }
    });
  }

  function updateLanguageOptions() {
    var select = document.getElementById("languageSelect");
    if (!select) {
      return;
    }

    Array.prototype.forEach.call(select.options, function (option) {
      var locale = catalog.locales[option.value];
      if (locale && locale.languageName) {
        option.textContent = locale.languageName;
      }
    });

    select.value = currentLocale;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLocale;
    document.title = t("app.title", document.title);
    updateLanguageOptions();
    applyDataAttributeTranslations();
    applySettingDescriptions();
    applyOptionLabels();
    applyResetHints();
  }

  function setLocale(locale) {
    if (!catalog.locales[locale]) {
      return;
    }

    currentLocale = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    applyTranslations();
    document.dispatchEvent(
      new CustomEvent("i18n:change", { detail: { locale: currentLocale } })
    );
  }

  function attachLanguageSelect() {
    var select = document.getElementById("languageSelect");
    if (!select) {
      return;
    }

    select.addEventListener("change", function () {
      setLocale(select.value);
    });
  }

  document.addEventListener("settings-form:rendered", function () {
    applyTranslations();
  });

  async function loadCatalog() {
    try {
      var response = await fetch(CATALOG_URL, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error("Unable to load translations: " + response.status);
      }

      catalog = await response.json();
      currentLocale = chooseInitialLocale();
    } catch (error) {
      if (window.PALWORLD_I18N_CATALOG) {
        catalog = window.PALWORLD_I18N_CATALOG;
        currentLocale = chooseInitialLocale();
        return;
      }

      console.warn(error);
    }
  }

  window.i18n = {
    ready: new Promise(function (resolve) {
      readyResolve = resolve;
    }),
    t: t,
    format: format,
    setLocale: setLocale,
    getLocale: function () {
      return currentLocale;
    }
  };

  document.addEventListener("DOMContentLoaded", async function () {
    await loadCatalog();
    attachLanguageSelect();
    applyTranslations();
    document.dispatchEvent(
      new CustomEvent("i18n:change", { detail: { locale: currentLocale } })
    );
    readyResolve();
  });
})();
