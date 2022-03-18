import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { AppTooltip } from "components";
import { AppThemeContext } from "providers/AppThemeProvider";
import { ThemeMode } from "./ThemeMode";

const ThemeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(AppThemeContext);
  const themeDarkMode = theme.palette.mode === ThemeMode.Dark;

  const getLightModeIcon = () => <Brightness7 sx={{ color: "white" }} />;
  const getDarkModeIcon = () => <Brightness4 sx={{ color: "white" }} />;
  const getIcon = () => (themeDarkMode ? getDarkModeIcon() : getLightModeIcon());
  const getTitle = () => (themeDarkMode ? t("theme.switchToLightMode") : t("theme.switchToDarkMode"));
  const getContent = () => (themeDarkMode ? t("theme.darkMode") : t("theme.lightMode"));

  return (
    <AppTooltip title={getTitle()}>
      <Button variant="outlined" startIcon={getIcon()} onClick={() => themeContext.switchThemeMode()}>
        <Typography color="white">{getContent()}</Typography>
      </Button>
    </AppTooltip>
  );
};

export default ThemeSwitcher;
