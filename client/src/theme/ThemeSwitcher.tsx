import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Tooltip, Switch, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { AppThemeContext } from "../providers/AppThemeProvider";
import { ThemeMode } from "./ThemeMode";
import { IconText } from "../components";

const ThemeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(AppThemeContext);
  const themeDarkMode = theme.palette.mode === ThemeMode.Dark;
  const [isDarkMode] = useState(themeDarkMode);

  const getLightModeLabel = () => <IconText icon={Brightness7} text={t("theme.lightMode")} />;
  const getDarkModeLabel = () => <IconText icon={Brightness4} text={t("theme.darkMode")} />;
  const getSwitchLabel = () => (themeDarkMode ? getDarkModeLabel() : getLightModeLabel());
  const getSwitchModeTooltip = () => (themeDarkMode ? t("theme.switchToLightMode") : t("theme.switchToDarkMode"));

  return (
    <Tooltip title={getSwitchModeTooltip()}>
      <FormControlLabel
        control={
          <Switch defaultChecked={isDarkMode} color="secondary" onClick={() => themeContext.switchThemeMode()} />
        }
        label={getSwitchLabel()}
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
