import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { ThemeContext } from "./theme-context";

const AppTheme: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const themeMode = React.useMemo(
    () => ({
      switchThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
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
