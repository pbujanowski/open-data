import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { english, polish, supportedLanguages, getLanguageByCode } from "./languages";

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    lng: english.code,
    fallbackLng: english.code,
    supportedLngs: supportedLanguages.map((language) => language.code),
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV === "development",
  });

export { english, polish, supportedLanguages, getLanguageByCode };

export default i18next;
