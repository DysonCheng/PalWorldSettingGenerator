function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "TW-zh",
      includedLanguages: "en,es,fr,de,it,pt,ru,zh-CN,ja,ko",
      AutoDisplay: false,
    },
    "google_translate_element"
  );
}
