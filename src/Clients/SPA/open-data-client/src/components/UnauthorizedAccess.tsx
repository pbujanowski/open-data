import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";

import { authService } from "services";
import DataCard from "./DataCard";

const UnauthorizedAccess: React.FC = () => {
  const [t] = useTranslation();
  const getTitle = () => <>{t("auth.loggedOut")}</>;

  const getBody = () => <>{t("auth.loggedInRequired")}</>;

  const getActions = () => (
    <Button onClick={() => authService().signinRedirect({ state: window.location.pathname })}>{t("auth.login")}</Button>
  );
  return <DataCard title={getTitle()} body={getBody()} actions={getActions()} />;
};

export default UnauthorizedAccess;
