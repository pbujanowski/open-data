import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingIndicator } from "components";
import { authService } from "services";
import { homeRoute } from "routes";

const LogoutCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService()
      .signoutRedirectCallback()
      .then(() => {
        navigate(homeRoute.path);
      });
  }, [navigate]);

  return <LoadingIndicator />;
};

export default LogoutCallback;
