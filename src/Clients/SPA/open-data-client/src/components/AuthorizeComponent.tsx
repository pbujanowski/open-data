import React from "react";

import { useAuth } from "hooks";

import LoadingIndicator from "./LoadingIndicator";
import UnauthorizedAccess from "./UnauthorizedAccess";

const AuthorizeComponent: React.FC = ({ children }) => {
  const auth = useAuth();

  const getComponentBody = () => (auth.isAuthenticated ? <>{children}</> : <UnauthorizedAccess />);

  return auth.isLoading ? <LoadingIndicator /> : getComponentBody();
};

export default AuthorizeComponent;
