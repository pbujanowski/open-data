import React from "react";
import * as locales from "@mui/material/locale";
import enLocale from "date-fns/locale/en-US";
import plLocale from "date-fns/locale/pl";

import { i18nextInstance, languages } from "../i18n";

const i18n = i18nextInstance().i18next;
const { english, polish } = languages();

const dateLocalesMap = {
  [english.code]: enLocale,
  [polish.code]: plLocale,
};

const themeLocalesMap = {
  [english.code]: "enUS",
  [polish.code]: "plPL",
};

const LocaleContext = React.createContext({
  getDateLocale: (): Locale => dateLocalesMap[i18n.language],
  setDateLocale: (localeCode: string) => {},
  setThemeLocale: (localeCode: string) => {},
});

const LocaleProvider = LocaleContext.Provider;

export type SupportedLocales = keyof typeof locales;

export { LocaleContext, LocaleProvider, locales as themeLocales, dateLocalesMap, themeLocalesMap };
