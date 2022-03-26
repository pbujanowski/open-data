import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";

import { authService } from "services";

const UserMenu: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getComponentBody = () =>
    isAuthenticated ? (
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={() => authService().signoutRedirect({ state: window.location.pathname })}
      >
        {t("auth.logout")}
      </Button>
    ) : (
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={() => authService().signinRedirect({ state: window.location.pathname })}
      >
        {t("auth.login")}
      </Button>
    );

  useEffect(() => {
    try {
      setIsLoading(true);
      authService()
        .isAuthenticated()
        .then((result) => setIsAuthenticated(result));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? <></> : getComponentBody();
};

export default UserMenu;
