import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

import { ThemeContext } from "./theme.context";
import { ThemeMode } from "./theme-mode.enum";

const AppTheme: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${ThemeMode.Dark})`);
  const defaultThemeMode = prefersDarkMode ? ThemeMode.Dark : ThemeMode.Light;
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

  useEffect(() => {
    setMode(defaultThemeMode);
  }, [defaultThemeMode]);

  const themeMode = useMemo(
    () => ({
      switchThemeMode: () => {
        setMode((prevMode) => (prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppTheme;
