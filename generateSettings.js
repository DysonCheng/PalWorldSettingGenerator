        function generateSettings() {     
            var Difficulty = document.getElementById('Difficulty').value;
            var DayTimeSpeedRate = document.getElementById('DayTimeSpeedRate').value;
            var NightTimeSpeedRate = document.getElementById('NightTimeSpeedRate').value;
            var ExpRate = document.getElementById('ExpRate').value;
            var PalCaptureRate = document.getElementById('PalCaptureRate').value;
            var PalSpawnNumRate = document.getElementById('PalSpawnNumRate').value;
            var PalDamageRateAttack = document.getElementById('PalDamageRateAttack').value;
            var PalDamageRateDefense = document.getElementById('PalDamageRateDefense').value;
            var PlayerDamageRateAttack = document.getElementById('PlayerDamageRateAttack').value;
            var PlayerDamageRateDefense = document.getElementById('PlayerDamageRateDefense').value;
            var PlayerStomachDecreaceRate = document.getElementById('PlayerStomachDecreaceRate').value;
            var PlayerStaminaDecreaceRate = document.getElementById('PlayerStaminaDecreaceRate').value;
            var PlayerAutoHPRegeneRate = document.getElementById('PlayerAutoHPRegeneRate').value;
            var PlayerAutoHpRegeneRateInSleep = document.getElementById('PlayerAutoHpRegeneRateInSleep').value;
            var PalStomachDecreaceRate = document.getElementById('PalStomachDecreaceRate').value;
            var PalStaminaDecreaceRate = document.getElementById('PalStaminaDecreaceRate').value;
            var PalAutoHPRegeneRate = document.getElementById('PalAutoHPRegeneRate').value;
            var PalAutoHpRegeneRateInSleep = document.getElementById('PalAutoHpRegeneRateInSleep').value;
            var BuildObjectDamageRate = document.getElementById('BuildObjectDamageRate').value;
            var BuildObjectDeteriorationDamageRate = document.getElementById('BuildObjectDeteriorationDamageRate').value;
            var CollectionDropRate = document.getElementById('CollectionDropRate').value;
            var CollectionObjectHpRate = document.getElementById('CollectionObjectHpRate').value;
            var CollectionObjectRespawnSpeedRate = document.getElementById('CollectionObjectRespawnSpeedRate').value;
            var EnemyDropItemRate = document.getElementById('EnemyDropItemRate').value;
            var DeathPenalty = document.getElementById('DeathPenalty').value;
            var bEnablePlayerToPlayerDamage = document.getElementById('bEnablePlayerToPlayerDamage').value;
            var bEnableFriendlyFire = document.getElementById('bEnableFriendlyFire').value;
            var bEnableInvaderEnemy = document.getElementById('bEnableInvaderEnemy').value;
            var bActiveUNKO = document.getElementById('bActiveUNKO').value;
            var bEnableAimAssistPad = document.getElementById('bEnableAimAssistPad').value;
            var bEnableAimAssistKeyboard = document.getElementById('bEnableAimAssistKeyboard').value;
            var DropItemMaxNum = document.getElementById('DropItemMaxNum').value;
            var DropItemMaxNum_UNKO = document.getElementById('DropItemMaxNum_UNKO').value;
            var BaseCampMaxNum = document.getElementById('BaseCampMaxNum').value;
            var BaseCampWorkerMaxNum = document.getElementById('BaseCampWorkerMaxNum').value;
            var DropItemAliveMaxHours = document.getElementById('DropItemAliveMaxHours').value;
            var bAutoResetGuildNoOnlinePlayers = document.getElementById('bAutoResetGuildNoOnlinePlayers').value;
            var AutoResetGuildTimeNoOnlinePlayers = document.getElementById('AutoResetGuildTimeNoOnlinePlayers').value;
            var GuildPlayerMaxNum = document.getElementById('GuildPlayerMaxNum').value;
            var PalEggDefaultHatchingTime = document.getElementById('PalEggDefaultHatchingTime').value;
            var WorkSpeedRate = document.getElementById('WorkSpeedRate').value;
            var bIsMultiplay = document.getElementById('bIsMultiplay').value;
            var bIsPvP = document.getElementById('bIsPvP').value;
            var bCanPickupOtherGuildDeathPenaltyDrop = document.getElementById('bCanPickupOtherGuildDeathPenaltyDrop').value;
            var bEnableNonLoginPenalty = document.getElementById('bEnableNonLoginPenalty').value;
            var bEnableFastTravel = document.getElementById('bEnableFastTravel').value;
            var bIsStartLocationSelectByMap = document.getElementById('bIsStartLocationSelectByMap').value;
            var bExistPlayerAfterLogout = document.getElementById('bExistPlayerAfterLogout').value;
            var bEnableDefenseOtherGuildPlayer = document.getElementById('bEnableDefenseOtherGuildPlayer').value;
            var CoopPlayerMaxNum = document.getElementById('CoopPlayerMaxNum').value;
            var ServerPlayerMaxNum = document.getElementById('ServerPlayerMaxNum').value;
            var ServerName = '"' + document.getElementById('ServerName').value + '"';
            var ServerDescription = '"' + document.getElementById('ServerDescription').value + '"';
            var AdminPassword = '"' + document.getElementById('AdminPassword').value + '"';
            var ServerPassword = '"' + document.getElementById('ServerPassword').value + '"';
            var PublicPort = document.getElementById('PublicPort').value;
            var PublicIP = '"' + document.getElementById('PublicIP').value + '"';
            var RCONEnabled = document.getElementById('RCONEnabled').value;
            var RCONPort = document.getElementById('RCONPort').value;
            var Region = '"' + document.getElementById('Region').value + '"';
            var bUseAuth = document.getElementById('bUseAuth').value;
            var BanListURL = '"' + document.getElementById('BanListURL').value + '"';
            // Create the PalWorldSettings.ini content
            var settingsContent = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty=${Difficulty},DayTimeSpeedRate=${DayTimeSpeedRate},NightTimeSpeedRate=${NightTimeSpeedRate},ExpRate=${ExpRate},PalCaptureRate=${PalCaptureRate},PalSpawnNumRate=${PalSpawnNumRate},PalDamageRateAttack=${PalDamageRateAttack},PalDamageRateDefense=${PalDamageRateDefense},PlayerDamageRateAttack=${PlayerDamageRateAttack},PlayerDamageRateDefense=${PlayerDamageRateDefense},PlayerStomachDecreaceRate=${PlayerStomachDecreaceRate},PlayerStaminaDecreaceRate=${PlayerStaminaDecreaceRate},PlayerAutoHPRegeneRate=${PlayerAutoHPRegeneRate},PlayerAutoHpRegeneRateInSleep=${PlayerAutoHpRegeneRateInSleep},PalStomachDecreaceRate=${PalStomachDecreaceRate},PalStaminaDecreaceRate=${PalStaminaDecreaceRate},PalAutoHPRegeneRate=${PalAutoHPRegeneRate},PalAutoHpRegeneRateInSleep=${PalAutoHpRegeneRateInSleep},BuildObjectDamageRate=${BuildObjectDamageRate},BuildObjectDeteriorationDamageRate=${BuildObjectDeteriorationDamageRate},CollectionDropRate=${CollectionDropRate},CollectionObjectHpRate=${CollectionObjectHpRate},CollectionObjectRespawnSpeedRate=${CollectionObjectRespawnSpeedRate},EnemyDropItemRate=${EnemyDropItemRate},DeathPenalty=${DeathPenalty},bEnablePlayerToPlayerDamage=${bEnablePlayerToPlayerDamage},bEnableFriendlyFire=${bEnableFriendlyFire},bEnableInvaderEnemy=${bEnableInvaderEnemy},bActiveUNKO=${bActiveUNKO},bEnableAimAssistPad=${bEnableAimAssistPad},bEnableAimAssistKeyboard=${bEnableAimAssistKeyboard},DropItemMaxNum=${DropItemMaxNum},DropItemMaxNum_UNKO=${DropItemMaxNum_UNKO},BaseCampMaxNum=${BaseCampMaxNum},BaseCampWorkerMaxNum=${BaseCampWorkerMaxNum},DropItemAliveMaxHours=${DropItemAliveMaxHours},bAutoResetGuildNoOnlinePlayers=${bAutoResetGuildNoOnlinePlayers},AutoResetGuildTimeNoOnlinePlayers=${AutoResetGuildTimeNoOnlinePlayers},GuildPlayerMaxNum=${GuildPlayerMaxNum},PalEggDefaultHatchingTime=${PalEggDefaultHatchingTime},WorkSpeedRate=${WorkSpeedRate},bIsMultiplay=${bIsMultiplay},bIsPvP=${bIsPvP},bCanPickupOtherGuildDeathPenaltyDrop=${bCanPickupOtherGuildDeathPenaltyDrop},bEnableNonLoginPenalty=${bEnableNonLoginPenalty},bEnableFastTravel=${bEnableFastTravel},bIsStartLocationSelectByMap=${bIsStartLocationSelectByMap},bExistPlayerAfterLogout=${bExistPlayerAfterLogout},bEnableDefenseOtherGuildPlayer=${bEnableDefenseOtherGuildPlayer},CoopPlayerMaxNum=${CoopPlayerMaxNum},ServerPlayerMaxNum=${ServerPlayerMaxNum},ServerName=${ServerName},ServerDescription=${ServerDescription},AdminPassword=${AdminPassword},ServerPassword=${ServerPassword},PublicPort=${PublicPort},PublicIP=${PublicIP},RCONEnabled=${RCONEnabled},RCONPort=${RCONPort},Region=${Region},bUseAuth=${bUseAuth},BanListURL=${BanListURL})`;

            copyCodeToClipboard(settingsContent);
            
            var notification = document.getElementById('notification');
            notification.style.opacity = 1;
            setTimeout(function() {
                notification.style.opacity = 0;
            }, 1500);
        }
        
        function copyCodeToClipboard(code) {
            var textarea = document.createElement('textarea');
            textarea.style.position = 'fixed';
            textarea.style.opacity = 0;
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        function SaveSettings() {
            
            var Difficulty = document.getElementById('Difficulty').value;
            var DayTimeSpeedRate = document.getElementById('DayTimeSpeedRate').value;
            var NightTimeSpeedRate = document.getElementById('NightTimeSpeedRate').value;
            var ExpRate = document.getElementById('ExpRate').value;
            var PalCaptureRate = document.getElementById('PalCaptureRate').value;
            var PalSpawnNumRate = document.getElementById('PalSpawnNumRate').value;
            var PalDamageRateAttack = document.getElementById('PalDamageRateAttack').value;
            var PalDamageRateDefense = document.getElementById('PalDamageRateDefense').value;
            var PlayerDamageRateAttack = document.getElementById('PlayerDamageRateAttack').value;
            var PlayerDamageRateDefense = document.getElementById('PlayerDamageRateDefense').value;
            var PlayerStomachDecreaceRate = document.getElementById('PlayerStomachDecreaceRate').value;
            var PlayerStaminaDecreaceRate = document.getElementById('PlayerStaminaDecreaceRate').value;
            var PlayerAutoHPRegeneRate = document.getElementById('PlayerAutoHPRegeneRate').value;
            var PlayerAutoHpRegeneRateInSleep = document.getElementById('PlayerAutoHpRegeneRateInSleep').value;
            var PalStomachDecreaceRate = document.getElementById('PalStomachDecreaceRate').value;
            var PalStaminaDecreaceRate = document.getElementById('PalStaminaDecreaceRate').value;
            var PalAutoHPRegeneRate = document.getElementById('PalAutoHPRegeneRate').value;
            var PalAutoHpRegeneRateInSleep = document.getElementById('PalAutoHpRegeneRateInSleep').value;
            var BuildObjectDamageRate = document.getElementById('BuildObjectDamageRate').value;
            var BuildObjectDeteriorationDamageRate = document.getElementById('BuildObjectDeteriorationDamageRate').value;
            var CollectionDropRate = document.getElementById('CollectionDropRate').value;
            var CollectionObjectHpRate = document.getElementById('CollectionObjectHpRate').value;
            var CollectionObjectRespawnSpeedRate = document.getElementById('CollectionObjectRespawnSpeedRate').value;
            var EnemyDropItemRate = document.getElementById('EnemyDropItemRate').value;
            var DeathPenalty = document.getElementById('DeathPenalty').value;
            var bEnablePlayerToPlayerDamage = document.getElementById('bEnablePlayerToPlayerDamage').value;
            var bEnableFriendlyFire = document.getElementById('bEnableFriendlyFire').value;
            var bEnableInvaderEnemy = document.getElementById('bEnableInvaderEnemy').value;
            var bActiveUNKO = document.getElementById('bActiveUNKO').value;
            var bEnableAimAssistPad = document.getElementById('bEnableAimAssistPad').value;
            var bEnableAimAssistKeyboard = document.getElementById('bEnableAimAssistKeyboard').value;
            var DropItemMaxNum = document.getElementById('DropItemMaxNum').value;
            var DropItemMaxNum_UNKO = document.getElementById('DropItemMaxNum_UNKO').value;
            var BaseCampMaxNum = document.getElementById('BaseCampMaxNum').value;
            var BaseCampWorkerMaxNum = document.getElementById('BaseCampWorkerMaxNum').value;
            var DropItemAliveMaxHours = document.getElementById('DropItemAliveMaxHours').value;
            var bAutoResetGuildNoOnlinePlayers = document.getElementById('bAutoResetGuildNoOnlinePlayers').value;
            var AutoResetGuildTimeNoOnlinePlayers = document.getElementById('AutoResetGuildTimeNoOnlinePlayers').value;
            var GuildPlayerMaxNum = document.getElementById('GuildPlayerMaxNum').value;
            var PalEggDefaultHatchingTime = document.getElementById('PalEggDefaultHatchingTime').value;
            var WorkSpeedRate = document.getElementById('WorkSpeedRate').value;
            var bIsMultiplay = document.getElementById('bIsMultiplay').value;
            var bIsPvP = document.getElementById('bIsPvP').value;
            var bCanPickupOtherGuildDeathPenaltyDrop = document.getElementById('bCanPickupOtherGuildDeathPenaltyDrop').value;
            var bEnableNonLoginPenalty = document.getElementById('bEnableNonLoginPenalty').value;
            var bEnableFastTravel = document.getElementById('bEnableFastTravel').value;
            var bIsStartLocationSelectByMap = document.getElementById('bIsStartLocationSelectByMap').value;
            var bExistPlayerAfterLogout = document.getElementById('bExistPlayerAfterLogout').value;
            var bEnableDefenseOtherGuildPlayer = document.getElementById('bEnableDefenseOtherGuildPlayer').value;
            var CoopPlayerMaxNum = document.getElementById('CoopPlayerMaxNum').value;
            var ServerPlayerMaxNum = document.getElementById('ServerPlayerMaxNum').value;
            var ServerName = '"' + document.getElementById('ServerName').value + '"';
            var ServerDescription = '"' + document.getElementById('ServerDescription').value + '"';
            var AdminPassword = '"' + document.getElementById('AdminPassword').value + '"';
            var ServerPassword = '"' + document.getElementById('ServerPassword').value + '"';
            var PublicPort = document.getElementById('PublicPort').value;
            var PublicIP = '"' + document.getElementById('PublicIP').value + '"';
            var RCONEnabled = document.getElementById('RCONEnabled').value;
            var RCONPort = document.getElementById('RCONPort').value;
            var Region = '"' + document.getElementById('Region').value + '"';
            var bUseAuth = document.getElementById('bUseAuth').value;
            var BanListURL = '"' + document.getElementById('BanListURL').value + '"';
            // Create the PalWorldSettings.ini content
            var settingsContent = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty=${Difficulty},DayTimeSpeedRate=${DayTimeSpeedRate},NightTimeSpeedRate=${NightTimeSpeedRate},ExpRate=${ExpRate},PalCaptureRate=${PalCaptureRate},PalSpawnNumRate=${PalSpawnNumRate},PalDamageRateAttack=${PalDamageRateAttack},PalDamageRateDefense=${PalDamageRateDefense},PlayerDamageRateAttack=${PlayerDamageRateAttack},PlayerDamageRateDefense=${PlayerDamageRateDefense},PlayerStomachDecreaceRate=${PlayerStomachDecreaceRate},PlayerStaminaDecreaceRate=${PlayerStaminaDecreaceRate},PlayerAutoHPRegeneRate=${PlayerAutoHPRegeneRate},PlayerAutoHpRegeneRateInSleep=${PlayerAutoHpRegeneRateInSleep},PalStomachDecreaceRate=${PalStomachDecreaceRate},PalStaminaDecreaceRate=${PalStaminaDecreaceRate},PalAutoHPRegeneRate=${PalAutoHPRegeneRate},PalAutoHpRegeneRateInSleep=${PalAutoHpRegeneRateInSleep},BuildObjectDamageRate=${BuildObjectDamageRate},BuildObjectDeteriorationDamageRate=${BuildObjectDeteriorationDamageRate},CollectionDropRate=${CollectionDropRate},CollectionObjectHpRate=${CollectionObjectHpRate},CollectionObjectRespawnSpeedRate=${CollectionObjectRespawnSpeedRate},EnemyDropItemRate=${EnemyDropItemRate},DeathPenalty=${DeathPenalty},bEnablePlayerToPlayerDamage=${bEnablePlayerToPlayerDamage},bEnableFriendlyFire=${bEnableFriendlyFire},bEnableInvaderEnemy=${bEnableInvaderEnemy},bActiveUNKO=${bActiveUNKO},bEnableAimAssistPad=${bEnableAimAssistPad},bEnableAimAssistKeyboard=${bEnableAimAssistKeyboard},DropItemMaxNum=${DropItemMaxNum},DropItemMaxNum_UNKO=${DropItemMaxNum_UNKO},BaseCampMaxNum=${BaseCampMaxNum},BaseCampWorkerMaxNum=${BaseCampWorkerMaxNum},DropItemAliveMaxHours=${DropItemAliveMaxHours},bAutoResetGuildNoOnlinePlayers=${bAutoResetGuildNoOnlinePlayers},AutoResetGuildTimeNoOnlinePlayers=${AutoResetGuildTimeNoOnlinePlayers},GuildPlayerMaxNum=${GuildPlayerMaxNum},PalEggDefaultHatchingTime=${PalEggDefaultHatchingTime},WorkSpeedRate=${WorkSpeedRate},bIsMultiplay=${bIsMultiplay},bIsPvP=${bIsPvP},bCanPickupOtherGuildDeathPenaltyDrop=${bCanPickupOtherGuildDeathPenaltyDrop},bEnableNonLoginPenalty=${bEnableNonLoginPenalty},bEnableFastTravel=${bEnableFastTravel},bIsStartLocationSelectByMap=${bIsStartLocationSelectByMap},bExistPlayerAfterLogout=${bExistPlayerAfterLogout},bEnableDefenseOtherGuildPlayer=${bEnableDefenseOtherGuildPlayer},CoopPlayerMaxNum=${CoopPlayerMaxNum},ServerPlayerMaxNum=${ServerPlayerMaxNum},ServerName=${ServerName},ServerDescription=${ServerDescription},AdminPassword=${AdminPassword},ServerPassword=${ServerPassword},PublicPort=${PublicPort},PublicIP=${PublicIP},RCONEnabled=${RCONEnabled},RCONPort=${RCONPort},Region=${Region},bUseAuth=${bUseAuth},BanListURL=${BanListURL})`;

            var blob = new Blob([settingsContent], { type: 'text/plain' });
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'PalWorldSettings.ini';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }