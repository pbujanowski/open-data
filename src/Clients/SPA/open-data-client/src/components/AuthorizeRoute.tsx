import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "hooks";
import { loginRoute } from "routes";

import LoadingIndicator from "./LoadingIndicator";

interface AuthorizeRouteProps {}

const AuthorizeRoute: React.FC<AuthorizeRouteProps> = ({ children }) => {
  const auth = useAuth();

  const getRouteBody = () => (auth.isAuthenticated ? <>{children}</> : <Navigate to={loginRoute.path} />);

  return auth.isLoading ? <LoadingIndicator /> : getRouteBody();
};

export default AuthorizeRoute;
