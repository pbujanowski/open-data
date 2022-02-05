import React from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Tooltip, Switch, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { ThemeContext } from "./theme-context";
import { ThemeMode } from "./theme-mode";
import { IconText } from "../components";

const ThemeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const themeMode = React.useContext(ThemeContext);
  const themeDarkMode = theme.palette.mode === ThemeMode.Dark;
  const [isDarkMode] = React.useState(themeDarkMode);

  //const isDarkMode = theme.palette.mode === ThemeMode.Dark;
  const getLightModeLabel = () => <IconText icon={Brightness7} text={t("theme.lightMode")} />;
  const getDarkModeLabel = () => <IconText icon={Brightness4} text={t("theme.darkMode")} />;
  const getSwitchLabel = () => (themeDarkMode ? getDarkModeLabel() : getLightModeLabel());
  const getSwitchModeTooltip = () => (themeDarkMode ? t("theme.switchToLightMode") : t("theme.switchToDarkMode"));

  return (
    <Tooltip title={getSwitchModeTooltip()}>
      <FormControlLabel
        control={<Switch defaultChecked={isDarkMode} onClick={() => themeMode.switchThemeMode()} />}
        label={getSwitchLabel()}
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
