import React from "react";

const AppThemeContext = React.createContext({
  switchThemeMode: () => {},
});

const AppThemeProvider = AppThemeContext.Provider;

export { AppThemeContext, AppThemeProvider };
