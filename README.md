# PalWorld Settings Generator

PalWorld Settings Generator 是一個給 PalWorld 專屬伺服器使用的設定產生器與編輯器。它把 `PalWorldSettings.ini` 裡的 `OptionSettings` 轉成可視化表單，讓伺服器管理者可以更快調整難度、倍率、PvP、RCON、Palbox、基地、死亡懲罰與進階系統參數。

線上使用：
[https://dysoncheng.github.io/PalWorldSettingGenerator/setting.html](https://dysoncheng.github.io/PalWorldSettingGenerator/setting.html)

## 功能總覽

- **Server 1.0 設定支援**：涵蓋目前頁面中的 119 個 PalWorld 伺服器設定項目。
- **可視化設定表單**：依照世界規則、Pal 與玩家倍率、物品掉落、建築基地、公會、死亡重生、PvP、公開伺服器、管理 API 與進階系統分類。
- **產生設定檔**：填完後可直接下載 `PalWorldSettings.ini`。
- **讀取既有設定**：貼上既有設定文字後可自動解析已知欄位，並列出未知或缺少的設定。
- **搜尋與篩選**：可用關鍵字搜尋設定，也能只顯示已修改項目。
- **數值滑桿**：數字類設定同時提供輸入框與滑桿，方便快速微調倍率與上限。
- **組態模板**：內建 Casual PvE、Hardcore、PvP、高倍率爽玩、Dedicated Server 穩定版等範本。
- **瀏覽器備份**：最多可在本機瀏覽器保存 10 組設定，可命名、載入、改名與清除。
- **備份比較**：選擇兩組已保存的備份，快速檢查哪些設定值不同。
- **多語系介面**：支援繁體中文、English、简体中文、日本語、한국어、Español、Français、Deutsch、Português、Русский。
- **分享鏈結**：可快速分享工具頁面。
- **主題切換**：提供明亮與深色/雪景風格介面。
- **官方資源入口**：頁面上方提供官方專屬伺服器指南、平衡建議、Community 伺服器教學與命令列表。

## 新版功能說明

近期版本重新整理了整個介面與操作流程，重點不只是「能產生設定」，而是讓大量伺服器參數更容易掃描、比較與調整。

### 全新 Apple 風格介面

- 重新設計為玻璃感、圓角、輕陰影的現代介面。
- 工具列固定在頁面上方，常用操作不用反覆捲動尋找。
- 深色模式改善對比度，按鈕、輸入框、重設圖示與狀態標籤都重新調整。
- 設定群組改為單欄呈現，長設定名稱不再被雙欄壓縮換行。

### 更完整的編輯體驗

- 每個設定群組都有標題、說明與項目數量。
- 修改過的欄位會顯示標籤，並可一鍵只看修改項目。
- 數字欄位加入滑桿，倍率、數量、時間類設定更容易用手感調整。
- 每個欄位保留重設按鈕，可快速回到預設值。

### 組態模板、備份與比較

- 組態模板可以快速套用常見伺服器風格。
- 目前表單可保存到瀏覽器本機備份槽，最多 10 組。
- 備份比較會列出兩組設定不同的欄位，適合測試不同平衡版本。
- 這些資料使用瀏覽器 `localStorage`，不會上傳到伺服器。

### 多語系與版面穩定性

- 新版介面已針對多語系長文字調整版面。
- 首頁標題維持單行顯示。
- 上方功能卡片分成「文字層」與「元件層」，避免不同語言長度造成按鈕與選單不對齊。

## 如何使用

1. 開啟線上頁面：
   [PalWorld Settings Generator](https://dysoncheng.github.io/PalWorldSettingGenerator/setting.html)
2. 選擇語言與需要的組態模板，或直接從表單手動調整。
3. 若已有舊設定，可把 `OptionSettings=(...)` 貼到「貼上設定」欄位並按「讀取」。
4. 使用搜尋、修改篩選、展開/收合來檢查設定。
5. 視需要保存到瀏覽器備份槽，或比較不同備份。
6. 按「下載到設定檔」取得 `PalWorldSettings.ini`。
7. 將產生的設定套用到 PalWorld 專屬伺服器。

## 本機執行

這是純靜態網頁專案，不需要後端服務。

```powershell
python -m http.server 8088 --bind 127.0.0.1
```

接著開啟：

```text
http://127.0.0.1:8088/setting.html
```

## 專案結構

```text
.
+-- setting.html              # 主頁面
+-- styles.css                # 介面樣式
+-- js/
|   +-- settingsSchema.js     # 設定欄位與輸出順序
|   +-- settingsForm.js       # 動態表單與欄位狀態
|   +-- generateSettings.js   # 產生 PalWorldSettings.ini
|   +-- parseConfig.js        # 解析既有 OptionSettings
|   +-- configSlots.js        # 瀏覽器備份與備份比較
|   +-- templates.js          # 組態模板
|   +-- i18n.js               # 多語系套用
+-- locales/
|   +-- translations.json
|   +-- translations.js
+-- imgs/
```

## 回饋與貢獻

如果你發現 PalWorld 新版設定缺漏、翻譯不自然、預設值需要調整，歡迎到 GitHub 回報或送出 PR。

GitHub：
[https://github.com/DysonCheng/PalWorldSettingGenerator](https://github.com/DysonCheng/PalWorldSettingGenerator)

## 授權與聲明

Web materials provided by ©Pocketpair, Inc.
本工具為社群輔助工具，與 Pocketpair, Inc. 無官方從屬關係。
