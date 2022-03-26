import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";

import { useAuth } from "hooks";

const UserMenu: React.FC = () => {
  const [t] = useTranslation();
  const auth = useAuth();

  const getComponentBody = () =>
    auth.isAuthenticated ? (
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={() => auth.authService().signoutRedirect({ state: window.location.pathname })}
      >
        {t("auth.logout")}
      </Button>
    ) : (
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={() => auth.authService().signinRedirect({ state: window.location.pathname })}
      >
        {t("auth.login")}
      </Button>
    );

  return auth.isLoading ? <></> : getComponentBody();
};

export default UserMenu;
