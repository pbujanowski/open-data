import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oauth2-pkce";
import { Box, Button } from "@mui/material";

const Login: React.FC = () => {
  const [t] = useTranslation();
  const { authService } = useAuth();

  return (
    <Box sx={{ width: 1, height: 1, m: 3 }}>
      <Button size="large" variant="outlined" onClick={() => authService.login()}>
        {t("auth.login")}
      </Button>
    </Box>
  );
};

export default Login;
