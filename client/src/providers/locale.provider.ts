import React from "react";
import * as locales from "@mui/material/locale";
import enLocale from "date-fns/locale/en-US";
import plLocale from "date-fns/locale/pl";

import i18n, { english, polish } from "../i18n";

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

export { LocaleContext, locales as themeLocales, dateLocalesMap, themeLocalesMap };

export default LocaleProvider;
