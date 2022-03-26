import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { authService } from "services";
import { loginRoute } from "routes";

import LoadingIndicator from "./LoadingIndicator";

interface AuthorizeRouteProps {}

const AuthorizeRoute: React.FC<AuthorizeRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getRouteBody = () => (isAuthenticated ? <>{children}</> : <Navigate to={loginRoute.path} />);

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

  return isLoading ? <LoadingIndicator /> : getRouteBody();
};

export default AuthorizeRoute;
