import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "react-oauth2-pkce";

import { loginRoute } from "routes";

interface AuthorizeRouteProps {}

const AuthorizeRoute: React.FC<AuthorizeRouteProps> = ({ children }) => {
  const { authService } = useAuth();

  return authService.isAuthenticated() ? <>{children}</> : <Navigate to={loginRoute.path} />;
};

export default AuthorizeRoute;
