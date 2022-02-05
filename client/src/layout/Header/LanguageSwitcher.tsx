import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Fade, Menu, MenuItem, Tooltip } from "@mui/material";

import { getLanguageByCode, supportedLanguages } from "../../i18n";

const LanguageSwitcher: React.FC = () => {
  const [t, i18n] = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const getTooltipTitle = () => t("language.changeLanguage");

  return (
    <>
      <Tooltip title={getTooltipTitle()}>
        <Button
          id="language-button"
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {`${t("language.name")}: ${getLanguageByCode(i18n.language)?.displayName}`}
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {supportedLanguages.map((language) => (
          <MenuItem key={language.code} onClick={() => handleLanguageChange(language.code)}>
            {language.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
