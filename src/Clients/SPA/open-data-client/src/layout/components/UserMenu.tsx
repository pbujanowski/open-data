import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oauth2-pkce";

import { Button } from "@mui/material";

const UserMenu: React.FC = () => {
  const [t] = useTranslation();
  const { authService } = useAuth();

  return authService.isAuthenticated() ? (
    <Button onClick={() => authService.logout()}>{t("auth.logout")}</Button>
  ) : (
    <Button onClick={() => authService.login()}>{t("auth.login")}</Button>
  );
};

export default UserMenu;
