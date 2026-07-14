(function () {
  var groups = [
    {
      id: "basicWorld",
      label: "基本與世界規則",
      description: "難度、隨機器、時間流速、經驗與自動存檔。"
    },
    {
      id: "palPlayerRates",
      label: "Pal 與玩家倍率",
      description: "Pal、玩家的傷害、飽食、耐力、生命回復與能力強化。"
    },
    {
      id: "itemsDrops",
      label: "採集、掉落與物品",
      description: "採集、掉落、物品重量、腐敗與物品容器更新。"
    },
    {
      id: "buildingBase",
      label: "建築與據點",
      description: "建築耐久、劣化、據點數量、建築限制與名稱顯示。"
    },
    {
      id: "guild",
      label: "公會與多人限制",
      description: "公會人數、離線重置、會長轉移與每幀處理限制。"
    },
    {
      id: "deathRespawn",
      label: "死亡、重生與懲罰",
      description: "死亡掉落、Hardcore、Pal Lost 與重生懲罰。"
    },
    {
      id: "pvpCombat",
      label: "PvP 與戰鬥規則",
      description: "PvP、友傷、PvP 地圖顯示與擊殺額外掉落。"
    },
    {
      id: "serverPublic",
      label: "伺服器連線與公開資訊",
      description: "伺服器名稱、密碼、公開 IP、Port、跨平台與人數上限。"
    },
    {
      id: "adminApiSecurity",
      label: "管理、API 與安全",
      description: "RCON、REST API、驗證、封鎖清單、玩家列表與 Client Mod。"
    },
    {
      id: "advancedSystem",
      label: "進階系統與效能",
      description: "襲擊、快速移動、備份、Log、語音、Palbox 與複寫距離。"
    }
  ];

  function field(key, group, type, defaultValue, label, options) {
    return Object.assign({
      key: key,
      group: group,
      type: type,
      defaultValue: defaultValue,
      label: label || key
    }, options || {});
  }

  var boolOptions = [
    { value: "True", label: "True" },
    { value: "False", label: "False" }
  ];

  var fields = [
    field("Difficulty", "basicWorld", "enum", "None", "整體遊戲難度", {
      options: ["None", "Easy", "Difficult"]
    }),
    field("RandomizerType", "basicWorld", "raw", "None", "隨機器類型"),
    field("RandomizerSeed", "basicWorld", "string", "", "隨機器種子"),
    field("bIsRandomizerPalLevelRandom", "basicWorld", "boolean", "False", "隨機器是否隨機 Pal 等級"),
    field("DayTimeSpeedRate", "basicWorld", "number", "1.000000", "白天流逝速度", { step: "0.1", min: "0" }),
    field("NightTimeSpeedRate", "basicWorld", "number", "1.000000", "夜晚流逝速度", { step: "0.1", min: "0" }),
    field("ExpRate", "basicWorld", "number", "1.000000", "經驗值倍率", { step: "0.1", min: "0" }),
    field("AutoSaveSpan", "basicWorld", "number", "30.000000", "自動存檔間隔", { step: "1", min: "0" }),

    field("PalCaptureRate", "palPlayerRates", "number", "1.000000", "捕獲機率倍率", { step: "0.1", min: "0" }),
    field("PalSpawnNumRate", "palPlayerRates", "number", "1.000000", "Pal 出現數量倍率", { step: "0.1", min: "0" }),
    field("PalDamageRateAttack", "palPlayerRates", "number", "1.000000", "Pal 攻擊傷害倍率", { step: "0.1", min: "0" }),
    field("PalDamageRateDefense", "palPlayerRates", "number", "1.000000", "Pal 承受傷害倍率", { step: "0.1", min: "0" }),
    field("PlayerDamageRateAttack", "palPlayerRates", "number", "1.000000", "玩家攻擊傷害倍率", { step: "0.1", min: "0" }),
    field("PlayerDamageRateDefense", "palPlayerRates", "number", "1.000000", "玩家承受傷害倍率", { step: "0.1", min: "0" }),
    field("PlayerStomachDecreaceRate", "palPlayerRates", "number", "1.000000", "玩家飽食度降低倍率", { step: "0.1", min: "0" }),
    field("PlayerStaminaDecreaceRate", "palPlayerRates", "number", "1.000000", "玩家耐力降低倍率", { step: "0.1", min: "0" }),
    field("PlayerAutoHPRegeneRate", "palPlayerRates", "number", "1.000000", "玩家生命值自然回復倍率", { step: "0.1", min: "0" }),
    field("PlayerAutoHpRegeneRateInSleep", "palPlayerRates", "number", "1.000000", "玩家睡眠時生命值回復倍率", { step: "0.1", min: "0" }),
    field("PalStomachDecreaceRate", "palPlayerRates", "number", "1.000000", "Pal 飽食度降低倍率", { step: "0.1", min: "0" }),
    field("PalStaminaDecreaceRate", "palPlayerRates", "number", "1.000000", "Pal 耐力降低倍率", { step: "0.1", min: "0" }),
    field("PalAutoHPRegeneRate", "palPlayerRates", "number", "1.000000", "Pal 生命值自然回復倍率", { step: "0.1", min: "0" }),
    field("PalAutoHpRegeneRateInSleep", "palPlayerRates", "number", "1.000000", "Pal 睡眠時生命值回復倍率", { step: "0.1", min: "0" }),
    field("bAllowEnhanceStat_Health", "palPlayerRates", "boolean", "True", "允許強化生命值"),
    field("bAllowEnhanceStat_Attack", "palPlayerRates", "boolean", "True", "允許強化攻擊"),
    field("bAllowEnhanceStat_Stamina", "palPlayerRates", "boolean", "True", "允許強化耐力"),
    field("bAllowEnhanceStat_Weight", "palPlayerRates", "boolean", "True", "允許強化負重"),
    field("bAllowEnhanceStat_WorkSpeed", "palPlayerRates", "boolean", "True", "允許強化工作速度"),
    field("PalEggDefaultHatchingTime", "palPlayerRates", "number", "1.000000", "巨大蛋孵化時間(小時)", { step: "0.1", min: "0" }),
    field("WorkSpeedRate", "palPlayerRates", "number", "1.000000", "工作速度倍率", { step: "0.1", min: "0" }),

    field("CollectionDropRate", "itemsDrops", "number", "1.000000", "道具採集量倍率", { step: "0.1", min: "0" }),
    field("CollectionObjectHpRate", "itemsDrops", "number", "1.000000", "可採集物生命值倍率", { step: "0.1", min: "0" }),
    field("CollectionObjectRespawnSpeedRate", "itemsDrops", "number", "1.000000", "可採集物刷新時間間隔", { step: "0.1", min: "0" }),
    field("EnemyDropItemRate", "itemsDrops", "number", "1.000000", "道具掉落量倍率", { step: "0.1", min: "0" }),
    field("DropItemMaxNum", "itemsDrops", "number", "3000", "世界內掉落物上限", { step: "100", min: "-1" }),
    field("PhysicsActiveDropItemMaxNum", "itemsDrops", "number", "-1", "啟用物理的掉落物上限", { step: "1" }),
    field("DropItemMaxNum_UNKO", "itemsDrops", "number", "100", "UNKO 掉落物上限", { step: "10", min: "0" }),
    field("DropItemAliveMaxHours", "itemsDrops", "number", "1.000000", "掉落物保留最大時間", { step: "0.1", min: "0" }),
    field("ItemWeightRate", "itemsDrops", "number", "1.000000", "物品重量倍率", { step: "0.1", min: "0" }),
    field("EquipmentDurabilityDamageRate", "itemsDrops", "number", "1.000000", "裝備耐久損耗倍率", { step: "0.1", min: "0" }),
    field("ItemContainerForceMarkDirtyInterval", "itemsDrops", "number", "1.000000", "物品容器強制標記更新間隔", { step: "0.1", min: "0" }),
    field("ItemCorruptionMultiplier", "itemsDrops", "number", "1.000000", "物品腐敗倍率", { step: "0.1", min: "0" }),
    field("DenyTechnologyList", "itemsDrops", "tagList", "", "禁止科技清單", {
      listStyle: "parenthesizedWhenNotEmpty"
    }),

    field("BuildObjectHpRate", "buildingBase", "number", "1.000000", "建築物生命值倍率", { step: "0.1", min: "0" }),
    field("BuildObjectDamageRate", "buildingBase", "number", "1.000000", "對建築傷害倍率", { step: "0.1", min: "0" }),
    field("BuildObjectDeteriorationDamageRate", "buildingBase", "number", "1.000000", "建築物劣化速度倍率", { step: "0.1", min: "0" }),
    field("BaseCampMaxNum", "buildingBase", "number", "128", "據點數量上限", { step: "1", min: "0" }),
    field("BaseCampWorkerMaxNum", "buildingBase", "number", "15", "據點工作 Pal 數量上限", { step: "1", min: "0" }),
    field("BaseCampMaxNumInGuild", "buildingBase", "number", "4", "每個公會據點數量上限", { step: "1", min: "0" }),
    field("bBuildAreaLimit", "buildingBase", "boolean", "False", "啟用建築區域限制"),
    field("MaxBuildingLimitNum", "buildingBase", "number", "0", "最大建築數量限制", { step: "1", min: "0" }),
    field("bInvisibleOtherGuildBaseCampAreaFX", "buildingBase", "boolean", "False", "隱藏其他公會據點區域特效"),
    field("bEnableBuildingPlayerUIdDisplay", "buildingBase", "boolean", "False", "顯示建築玩家 UID"),
    field("BuildingNameDisplayCacheTTLSeconds", "buildingBase", "number", "60", "建築名稱顯示快取秒數", { step: "1", min: "0" }),

    field("bAutoResetGuildNoOnlinePlayers", "guild", "boolean", "False", "沒上線玩家自動退出公會"),
    field("AutoResetGuildTimeNoOnlinePlayers", "guild", "number", "72.000000", "沒上線玩家公會自動退出時間", { step: "1", min: "0" }),
    field("GuildPlayerMaxNum", "guild", "number", "20", "公會人數上限", { step: "1", min: "0" }),
    field("GuildRejoinCooldownMinutes", "guild", "number", "0", "重新加入公會冷卻分鐘", { step: "1", min: "0" }),
    field("AutoTransferMasterCheckIntervalSeconds", "guild", "number", "3600.000000", "會長自動轉移檢查間隔秒數", { step: "60", min: "0" }),
    field("AutoTransferMasterThresholdDays", "guild", "number", "14", "會長自動轉移門檻天數", { step: "1", min: "0" }),
    field("MaxGuildsPerFrame", "guild", "number", "10", "每幀處理公會數上限", { step: "1", min: "0" }),

    field("DeathPenalty", "deathRespawn", "enum", "Item", "死亡懲罰", {
      options: ["None", "Item", "ItemAndEquipment", "All"]
    }),
    field("bHardcore", "deathRespawn", "boolean", "False", "Hardcore 模式"),
    field("bPalLost", "deathRespawn", "boolean", "False", "Pal Lost 模式"),
    field("bCharacterRecreateInHardcore", "deathRespawn", "boolean", "False", "Hardcore 允許角色重建"),
    field("bCanPickupOtherGuildDeathPenaltyDrop", "deathRespawn", "boolean", "False", "能否撿取其他公會死亡掉落物"),
    field("BlockRespawnTime", "deathRespawn", "number", "5.000000", "封鎖重生時間", { step: "0.1", min: "0" }),
    field("RespawnPenaltyDurationThreshold", "deathRespawn", "number", "0.000000", "重生懲罰持續門檻", { step: "0.1", min: "0" }),
    field("RespawnPenaltyTimeScale", "deathRespawn", "number", "2.000000", "重生懲罰時間倍率", { step: "0.1", min: "0" }),

    field("bEnablePlayerToPlayerDamage", "pvpCombat", "boolean", "False", "開啟玩家對玩家造成傷害"),
    field("bEnableFriendlyFire", "pvpCombat", "boolean", "False", "開啟同隊傷害"),
    field("bIsPvP", "pvpCombat", "boolean", "False", "是否開啟 PvP 模式"),
    field("bDisplayPvPItemNumOnWorldMap_BaseCamp", "pvpCombat", "boolean", "False", "世界地圖顯示據點 PvP 物品數"),
    field("bDisplayPvPItemNumOnWorldMap_Player", "pvpCombat", "boolean", "False", "世界地圖顯示玩家 PvP 物品數"),
    field("AdditionalDropItemWhenPlayerKillingInPvPMode", "pvpCombat", "string", "PlayerDropItem", "PvP 擊殺玩家額外掉落物"),
    field("AdditionalDropItemNumWhenPlayerKillingInPvPMode", "pvpCombat", "number", "1", "PvP 擊殺玩家額外掉落數量", { step: "1", min: "0" }),
    field("bAdditionalDropItemWhenPlayerKillingInPvPMode", "pvpCombat", "boolean", "False", "啟用 PvP 擊殺玩家額外掉落"),

    field("bIsMultiplay", "serverPublic", "boolean", "False", "是否多人遊玩"),
    field("CoopPlayerMaxNum", "serverPublic", "number", "4", "合作玩家人數上限", { step: "1", min: "0" }),
    field("ServerPlayerMaxNum", "serverPublic", "number", "32", "伺服器人數上限", { step: "1", min: "0" }),
    field("ServerName", "serverPublic", "string", "Default Palworld Server", "伺服器名稱"),
    field("ServerDescription", "serverPublic", "string", "", "伺服器描述"),
    field("AdminPassword", "serverPublic", "string", "", "管理員密碼"),
    field("ServerPassword", "serverPublic", "string", "", "伺服器密碼"),
    field("PublicPort", "serverPublic", "number", "8211", "公開連接埠", { step: "1", min: "0" }),
    field("PublicIP", "serverPublic", "string", "", "公開 IP"),
    field("Region", "serverPublic", "string", "", "區域"),
    field("CrossplayPlatforms", "serverPublic", "list", "(Steam,Xbox,PS5,Mac)", "跨平台清單", {
      options: ["Steam", "Xbox", "PS5", "Mac"],
      preserveOptionOrder: true,
      listStyle: "parenthesized"
    }),
    field("bIsShowJoinLeftMessage", "serverPublic", "boolean", "True", "顯示加入離開訊息"),

    field("bAllowClientMod", "adminApiSecurity", "boolean", "True", "允許 Client Mod"),
    field("RCONEnabled", "adminApiSecurity", "boolean", "False", "RCON 啟用"),
    field("RCONPort", "adminApiSecurity", "number", "25575", "RCON 連接埠", { step: "1", min: "0" }),
    field("RESTAPIEnabled", "adminApiSecurity", "boolean", "False", "REST API 啟用"),
    field("RESTAPIPort", "adminApiSecurity", "number", "8212", "REST API 連接埠", { step: "1", min: "0" }),
    field("bShowPlayerList", "adminApiSecurity", "boolean", "False", "顯示玩家列表"),
    field("ChatPostLimitPerMinute", "adminApiSecurity", "number", "30", "每分鐘聊天發送限制", { step: "1", min: "0" }),
    field("bUseAuth", "adminApiSecurity", "boolean", "True", "是否使用身份驗證"),
    field("BanListURL", "adminApiSecurity", "string", "https://b.palworldgame.com/api/banlist.txt", "封鎖清單 URL"),

    field("bEnableInvaderEnemy", "advancedSystem", "boolean", "True", "是否會發生襲擊事件"),
    field("bActiveUNKO", "advancedSystem", "boolean", "False", "啟用 UNKO"),
    field("bEnableAimAssistPad", "advancedSystem", "boolean", "True", "啟用手柄瞄準輔助"),
    field("bEnableAimAssistKeyboard", "advancedSystem", "boolean", "False", "啟用鍵盤瞄準輔助"),
    field("bEnableNonLoginPenalty", "advancedSystem", "boolean", "True", "是否啟用沒登入處罰"),
    field("bEnableFastTravel", "advancedSystem", "boolean", "True", "是否啟用快速移動"),
    field("bEnableFastTravelOnlyBaseCamp", "advancedSystem", "boolean", "False", "快速移動僅限據點"),
    field("bIsStartLocationSelectByMap", "advancedSystem", "boolean", "False", "新角色可選擇出生點"),
    field("bExistPlayerAfterLogout", "advancedSystem", "boolean", "False", "登出後玩家仍存在"),
    field("bEnableDefenseOtherGuildPlayer", "advancedSystem", "boolean", "False", "是否會受到其他公會傷害"),
    field("bIsUseBackupSaveData", "advancedSystem", "boolean", "True", "使用備份存檔資料"),
    field("LogFormatType", "advancedSystem", "raw", "Text", "Log 格式類型"),
    field("SupplyDropSpan", "advancedSystem", "number", "180", "補給掉落間隔", { step: "1", min: "0" }),
    field("EnablePredatorBossPal", "advancedSystem", "boolean", "True", "啟用 Predator Boss Pal"),
    field("ServerReplicatePawnCullDistance", "advancedSystem", "number", "15000.000000", "伺服器 Pawn 複寫裁切距離", { step: "100", min: "0" }),
    field("bAllowGlobalPalboxExport", "advancedSystem", "boolean", "True", "允許 Global Palbox 匯出"),
    field("bAllowGlobalPalboxImport", "advancedSystem", "boolean", "False", "允許 Global Palbox 匯入"),
    field("PlayerDataPalStorageUpdateCheckTickInterval", "advancedSystem", "number", "1.000000", "玩家 Pal 儲存更新檢查 Tick 間隔", { step: "0.1", min: "0" }),
    field("MonsterFarmActionSpeedRate", "advancedSystem", "number", "1.000000", "牧場行動速度倍率", { step: "0.1", min: "0" }),
    field("bEnableVoiceChat", "advancedSystem", "boolean", "False", "啟用語音聊天"),
    field("VoiceChatMaxVolumeDistance", "advancedSystem", "number", "3000.000000", "語音最大音量距離", { step: "100", min: "0" }),
    field("VoiceChatZeroVolumeDistance", "advancedSystem", "number", "15000.000000", "語音零音量距離", { step: "100", min: "0" })
  ];

  var outputOrder = [
    "Difficulty", "RandomizerType", "RandomizerSeed", "bIsRandomizerPalLevelRandom",
    "DayTimeSpeedRate", "NightTimeSpeedRate", "ExpRate", "PalCaptureRate",
    "PalSpawnNumRate", "PalDamageRateAttack", "PalDamageRateDefense",
    "PlayerDamageRateAttack", "PlayerDamageRateDefense", "PlayerStomachDecreaceRate",
    "PlayerStaminaDecreaceRate", "PlayerAutoHPRegeneRate", "PlayerAutoHpRegeneRateInSleep",
    "PalStomachDecreaceRate", "PalStaminaDecreaceRate", "PalAutoHPRegeneRate",
    "PalAutoHpRegeneRateInSleep", "BuildObjectHpRate", "BuildObjectDamageRate",
    "BuildObjectDeteriorationDamageRate", "CollectionDropRate", "CollectionObjectHpRate",
    "CollectionObjectRespawnSpeedRate", "EnemyDropItemRate", "DeathPenalty",
    "bEnablePlayerToPlayerDamage", "bEnableFriendlyFire", "bEnableInvaderEnemy",
    "bActiveUNKO", "bEnableAimAssistPad", "bEnableAimAssistKeyboard", "DropItemMaxNum",
    "PhysicsActiveDropItemMaxNum", "DropItemMaxNum_UNKO", "BaseCampMaxNum",
    "BaseCampWorkerMaxNum", "DropItemAliveMaxHours", "bAutoResetGuildNoOnlinePlayers",
    "AutoResetGuildTimeNoOnlinePlayers", "GuildPlayerMaxNum", "BaseCampMaxNumInGuild",
    "PalEggDefaultHatchingTime", "WorkSpeedRate", "AutoSaveSpan", "bIsMultiplay",
    "bIsPvP", "bHardcore", "bPalLost", "bCharacterRecreateInHardcore",
    "bCanPickupOtherGuildDeathPenaltyDrop", "bEnableNonLoginPenalty", "bEnableFastTravel",
    "bEnableFastTravelOnlyBaseCamp", "bIsStartLocationSelectByMap", "bExistPlayerAfterLogout",
    "bEnableDefenseOtherGuildPlayer", "bInvisibleOtherGuildBaseCampAreaFX", "bBuildAreaLimit",
    "ItemWeightRate", "CoopPlayerMaxNum", "ServerPlayerMaxNum", "ServerName",
    "ServerDescription", "AdminPassword", "ServerPassword", "bAllowClientMod",
    "PublicPort", "PublicIP", "RCONEnabled", "RCONPort", "Region", "bUseAuth",
    "BanListURL", "RESTAPIEnabled", "RESTAPIPort", "bShowPlayerList",
    "ChatPostLimitPerMinute", "CrossplayPlatforms", "bIsUseBackupSaveData", "LogFormatType",
    "bIsShowJoinLeftMessage", "SupplyDropSpan", "EnablePredatorBossPal",
    "MaxBuildingLimitNum", "ServerReplicatePawnCullDistance", "bAllowGlobalPalboxExport",
    "bAllowGlobalPalboxImport", "EquipmentDurabilityDamageRate",
    "ItemContainerForceMarkDirtyInterval", "PlayerDataPalStorageUpdateCheckTickInterval",
    "ItemCorruptionMultiplier", "MonsterFarmActionSpeedRate", "DenyTechnologyList",
    "GuildRejoinCooldownMinutes", "AutoTransferMasterCheckIntervalSeconds",
    "AutoTransferMasterThresholdDays", "MaxGuildsPerFrame", "BlockRespawnTime",
    "RespawnPenaltyDurationThreshold", "RespawnPenaltyTimeScale",
    "bDisplayPvPItemNumOnWorldMap_BaseCamp", "bDisplayPvPItemNumOnWorldMap_Player",
    "AdditionalDropItemWhenPlayerKillingInPvPMode",
    "AdditionalDropItemNumWhenPlayerKillingInPvPMode",
    "bAdditionalDropItemWhenPlayerKillingInPvPMode", "bEnableVoiceChat",
    "VoiceChatMaxVolumeDistance", "VoiceChatZeroVolumeDistance", "bAllowEnhanceStat_Health",
    "bAllowEnhanceStat_Attack", "bAllowEnhanceStat_Stamina", "bAllowEnhanceStat_Weight",
    "bAllowEnhanceStat_WorkSpeed", "bEnableBuildingPlayerUIdDisplay",
    "BuildingNameDisplayCacheTTLSeconds"
  ];

  window.settingsSchema = {
    groups: groups,
    fields: fields,
    outputOrder: outputOrder,
    boolOptions: boolOptions
  };
})();
