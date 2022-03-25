import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oauth2-pkce";
import { Button } from "@mui/material";

import DataCard from "./DataCard";

const AuthorizeComponent: React.FC = ({ children }) => {
  const [t] = useTranslation();
  const { authService } = useAuth();

  const getTitle = () => <>{t("auth.loggedOut")}</>;

  const getBody = () => <>{t("auth.loggedInRequired")}</>;

  const getActions = () => <Button onClick={() => authService.login()}>{t("auth.login")}</Button>;

  const getUnauthorizedComponent = () => <DataCard title={getTitle()} body={getBody()} actions={getActions()} />;

  return authService.isAuthenticated() ? <>{children}</> : getUnauthorizedComponent();
};

export default AuthorizeComponent;
