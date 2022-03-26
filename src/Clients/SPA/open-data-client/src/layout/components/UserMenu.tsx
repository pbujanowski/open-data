import React from "react";
import { useTranslation } from "react-i18next";

import { Button, SxProps } from "@mui/material";

import { useAuth } from "hooks";

const UserMenu: React.FC = () => {
  const [t] = useTranslation();
  const auth = useAuth();

  const getButtonSxProps = (): SxProps => ({ my: 2, color: "white", display: "block" });

  const getComponentBody = () =>
    auth.isAuthenticated ? (
      <>
        <Button sx={getButtonSxProps()}>{`${t("auth.profile")} (${auth.user?.profile.email})`}</Button>
        <Button
          sx={getButtonSxProps()}
          onClick={() => auth.authService().signoutRedirect({ state: window.location.pathname })}
        >
          {t("auth.logout")}
        </Button>
      </>
    ) : (
      <Button
        sx={getButtonSxProps()}
        onClick={() => auth.authService().signinRedirect({ state: window.location.pathname })}
      >
        {t("auth.login")}
      </Button>
    );

  return auth.isLoading ? <></> : getComponentBody();
};

export default UserMenu;
