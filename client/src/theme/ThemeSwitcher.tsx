import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip, useTheme } from "@mui/material";

import { ThemeContext } from "./theme-context";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const themeMode = React.useContext(ThemeContext);

  const isDarkMode = () => theme.palette.mode === "dark";

  const getSwitchModeLabel = () => (isDarkMode() ? t("theme.switchToLightMode") : t("theme.switchToDarkMode"));

  return (
    <Tooltip title={getSwitchModeLabel()}>
      <IconButton onClick={themeMode.switchThemeMode}>{isDarkMode() ? <Brightness7 /> : <Brightness4 />}</IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
