import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";

import { AppThemeProvider } from "providers/AppThemeProvider";
import {
  LocaleProvider,
  dateLocalesMap,
  SupportedLocales,
  themeLocales,
  themeLocalesMap,
} from "providers/LocaleProvider";

import { ThemeMode } from "./ThemeMode";

const AppTheme: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${ThemeMode.Dark})`);
  const defaultThemeMode = prefersDarkMode ? ThemeMode.Dark : ThemeMode.Light;
  const defaultThemeLocale = themeLocalesMap[i18n.language] as SupportedLocales;
  const [currentThemeMode, setCurrentThemeMode] = useState<ThemeMode>(ThemeMode.Light);
  const [currentThemeLocale, setCurrentThemeLocale] = useState<SupportedLocales>(defaultThemeLocale);
  const [currentDateLocale, setCurrentDateLocale] = useState<Locale>(dateLocalesMap[i18n.language]);

  useEffect(() => {
    setCurrentThemeMode(defaultThemeMode);
    setCurrentThemeLocale(defaultThemeLocale);
  }, [defaultThemeMode, defaultThemeLocale]);

  const appThemeValue = useMemo(
    () => ({
      switchThemeMode: () => {
        setCurrentThemeMode((prevMode) => (prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
      },
    }),
    [],
  );

  const localeValue = useMemo(
    () => ({
      getDateLocale: (): Locale => currentDateLocale,
      setDateLocale: (localeCode: string) => setCurrentDateLocale(dateLocalesMap[localeCode]),
      setThemeLocale: (localeCode: string) => setCurrentThemeLocale(themeLocalesMap[localeCode] as SupportedLocales),
    }),
    [currentDateLocale],
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: currentThemeMode,
          },
        },
        themeLocales[currentThemeLocale],
      ),
    [currentThemeMode, currentThemeLocale],
  );

  return (
    <LocaleProvider value={localeValue}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={currentDateLocale}>
        <AppThemeProvider value={appThemeValue}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppThemeProvider>
      </LocalizationProvider>
    </LocaleProvider>
  );
};

export default AppTheme;
