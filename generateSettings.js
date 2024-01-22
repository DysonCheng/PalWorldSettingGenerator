        function generateSettings() {
            // Collect values from input fields
            var difficulty = document.getElementById('difficulty').value;
            var dayTimeSpeedRate = document.getElementById('dayTimeSpeedRate').value;
            var nightTimeSpeedRate = document.getElementById('nightTimeSpeedRate').value;
            var expRate = document.getElementById('expRate').value;
            var palCaptureRate = document.getElementById('palCaptureRate').value;
            var palSpawnNumRate = document.getElementById('palSpawnNumRate').value;
            var palDamageRateAttack = document.getElementById('palDamageRateAttack').value;
            var palDamageRateDefense = document.getElementById('palDamageRateDefense').value;
            var playerDamageRateAttack = document.getElementById('playerDamageRateAttack').value;
            var playerDamageRateDefense = document.getElementById('playerDamageRateDefense').value;
            var playerStomachDecreaceRate = document.getElementById('PlayerStomachDecreaceRate').value;
            var playerStaminaDecreaceRate = document.getElementById('playerStaminaDecreaceRate').value;
            var playerAutoHPRegeneRate = document.getElementById('playerAutoHPRegeneRate').value;
            var playerAutoHpRegeneRateInSleep = document.getElementById('playerAutoHpRegeneRateInSleep').value;
            var palStomachDecreaceRate = document.getElementById('palStomachDecreaceRate').value;
            var palStaminaDecreaceRate = document.getElementById('palStaminaDecreaceRate').value;
            var palAutoHPRegeneRate = document.getElementById('palAutoHPRegeneRate').value;
            var palAutoHpRegeneRateInSleep = document.getElementById('palAutoHpRegeneRateInSleep').value;
            var buildObjectDamageRate = document.getElementById('buildObjectDamageRate').value;
            var buildObjectDeteriorationDamageRate = document.getElementById('buildObjectDeteriorationDamageRate').value;
            var collectionDropRate = document.getElementById('collectionDropRate').value;
            var collectionObjectHpRate = document.getElementById('collectionObjectHpRate').value;
            var collectionObjectRespawnSpeedRate = document.getElementById('collectionObjectRespawnSpeedRate').value;
            var enemyDropItemRate = document.getElementById('enemyDropItemRate').value;
            var deathPenalty = document.getElementById('deathPenalty').value;
            var bEnablePlayerToPlayerDamage = document.getElementById('bEnablePlayerToPlayerDamage').value;
            var bEnableFriendlyFire = document.getElementById('bEnableFriendlyFire').value;
            var bEnableInvaderEnemy = document.getElementById('bEnableInvaderEnemy').value;
            var bActiveUNKO = document.getElementById('bActiveUNKO').value;
            var bEnableAimAssistPad = document.getElementById('bEnableAimAssistPad').value;
            var bEnableAimAssistKeyboard = document.getElementById('bEnableAimAssistKeyboard').value;
            var dropItemMaxNum = document.getElementById('dropItemMaxNum').value;
            var dropItemMaxNum_UNKO = document.getElementById('dropItemMaxNum_UNKO').value;
            var baseCampMaxNum = document.getElementById('baseCampMaxNum').value;
            var baseCampWorkerMaxNum = document.getElementById('baseCampWorkerMaxNum').value;
            var dropItemAliveMaxHours = document.getElementById('dropItemAliveMaxHours').value;
            var bAutoResetGuildNoOnlinePlayers = document.getElementById('bAutoResetGuildNoOnlinePlayers').value;
            var autoResetGuildTimeNoOnlinePlayers = document.getElementById('autoResetGuildTimeNoOnlinePlayers').value;
            var guildPlayerMaxNum = document.getElementById('guildPlayerMaxNum').value;
            var palEggDefaultHatchingTime = document.getElementById('palEggDefaultHatchingTime').value;
            var workSpeedRate = document.getElementById('workSpeedRate').value;
            var bIsMultiplay = document.getElementById('bIsMultiplay').value;
            var bIsPvP = document.getElementById('bIsPvP').value;
            var bCanPickupOtherGuildDeathPenaltyDrop = document.getElementById('bCanPickupOtherGuildDeathPenaltyDrop').value;
            var bEnableNonLoginPenalty = document.getElementById('bEnableNonLoginPenalty').value;
            var bEnableFastTravel = document.getElementById('bEnableFastTravel').value;
            var bIsStartLocationSelectByMap = document.getElementById('bIsStartLocationSelectByMap').value;
            var bExistPlayerAfterLogout = document.getElementById('bExistPlayerAfterLogout').value;
            var bEnableDefenseOtherGuildPlayer = document.getElementById('bEnableDefenseOtherGuildPlayer').value;
            var coopPlayerMaxNum = document.getElementById('coopPlayerMaxNum').value;
            var serverPlayerMaxNum = document.getElementById('serverPlayerMaxNum').value;
            var serverName = document.getElementById('serverName').value;
            var serverDescription = document.getElementById('serverDescription').value;
            var adminPassword = document.getElementById('adminPassword').value;
            var serverPassword = document.getElementById('serverPassword').value;
            var publicPort = document.getElementById('publicPort').value;
            var publicIP = document.getElementById('publicIP').value;
            var rconEnabled = document.getElementById('rconEnabled').value;
            var rconPort = document.getElementById('rconPort').value;
            var region = document.getElementById('region').value;
            var bUseAuth = document.getElementById('bUseAuth').value;
            var banListURL = document.getElementById('banListURL').value;
            // Create the PalWorldSettings.ini content
            var settingsContent = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty="${difficulty}",DayTimeSpeedRate="${dayTimeSpeedRate}",NightTimeSpeedRate="${nightTimeSpeedRate}",ExpRate="${expRate}",PalCaptureRate="${palCaptureRate}",PalSpawnNumRate="${palSpawnNumRate}",PalDamageRateAttack="${palDamageRateAttack}",PalDamageRateDefense="${palDamageRateDefense}",PlayerDamageRateAttack="${playerDamageRateAttack}",PlayerDamageRateDefense="${playerDamageRateDefense}",PlayerStomachDecreaceRate="${playerStomachDecreaceRate}",PlayerStaminaDecreaceRate="${playerStaminaDecreaceRate}",PlayerAutoHPRegeneRate="${playerAutoHPRegeneRate}",PlayerAutoHpRegeneRateInSleep="${playerAutoHpRegeneRateInSleep}",PalStomachDecreaceRate="${palStomachDecreaceRate}",PalStaminaDecreaceRate="${palStaminaDecreaceRate}",PalAutoHPRegeneRate="${palAutoHPRegeneRate}",PalAutoHpRegeneRateInSleep="${palAutoHpRegeneRateInSleep}",BuildObjectDamageRate="${buildObjectDamageRate}",BuildObjectDeteriorationDamageRate="${buildObjectDeteriorationDamageRate}",CollectionDropRate="${collectionDropRate}",CollectionObjectHpRate="${collectionObjectHpRate}",CollectionObjectRespawnSpeedRate="${collectionObjectRespawnSpeedRate}",EnemyDropItemRate="${enemyDropItemRate}",DeathPenalty="${deathPenalty}",bEnablePlayerToPlayerDamage="${bEnablePlayerToPlayerDamage}",bEnableFriendlyFire="${bEnableFriendlyFire}",bEnableInvaderEnemy="${bEnableInvaderEnemy}",bActiveUNKO="${bActiveUNKO}",bEnableAimAssistPad="${bEnableAimAssistPad}",bEnableAimAssistKeyboard="${bEnableAimAssistKeyboard}",DropItemMaxNum="${dropItemMaxNum}",DropItemMaxNum_UNKO="${dropItemMaxNum_UNKO}",BaseCampMaxNum="${baseCampMaxNum}",BaseCampWorkerMaxNum="${baseCampWorkerMaxNum}",DropItemAliveMaxHours="${dropItemAliveMaxHours}",bAutoResetGuildNoOnlinePlayers="${bAutoResetGuildNoOnlinePlayers}",AutoResetGuildTimeNoOnlinePlayers="${autoResetGuildTimeNoOnlinePlayers}",GuildPlayerMaxNum="${guildPlayerMaxNum}",PalEggDefaultHatchingTime="${palEggDefaultHatchingTime}",WorkSpeedRate="${workSpeedRate}",bIsMultiplay="${bIsMultiplay}",bIsPvP="${bIsPvP}",bCanPickupOtherGuildDeathPenaltyDrop="${bCanPickupOtherGuildDeathPenaltyDrop}",bEnableNonLoginPenalty="${bEnableNonLoginPenalty}",bEnableFastTravel="${bEnableFastTravel}",bIsStartLocationSelectByMap="${bIsStartLocationSelectByMap}",bExistPlayerAfterLogout="${bExistPlayerAfterLogout}",bEnableDefenseOtherGuildPlayer="${bEnableDefenseOtherGuildPlayer}",CoopPlayerMaxNum="${coopPlayerMaxNum}",ServerPlayerMaxNum="${serverPlayerMaxNum}",ServerName="${serverName}",ServerDescription="${serverDescription}",AdminPassword="${adminPassword}",ServerPassword="${serverPassword}",PublicPort="${publicPort}",PublicIP="${publicIP}",RCONEnabled="${rconEnabled}",RCONPort="${rconPort}",Region="${region}",bUseAuth="${bUseAuth}",BanListURL="${banListURL}")`;

            // Create a Blob with the content
            var blob = new Blob([settingsContent], { type: 'text/plain' });

            // Create a download link and trigger the download
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'PalWorldSettings.ini';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }