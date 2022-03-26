import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingIndicator } from "components";
import { authService } from "services";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService()
      .signinRedirectCallback()
      .then((user) => {
        navigate(user.state as string);
      });
  }, [navigate]);

  return <LoadingIndicator />;
};

export default LoginCallback;
