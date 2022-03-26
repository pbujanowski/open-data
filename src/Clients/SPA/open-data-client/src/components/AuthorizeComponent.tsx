import React, { useEffect, useState } from "react";

import { authService } from "services";

import LoadingIndicator from "./LoadingIndicator";
import UnauthorizedAccess from "./UnauthorizedAccess";

const AuthorizeComponent: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getComponentBody = () => (isAuthenticated ? <>{children}</> : <UnauthorizedAccess />);

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

  return isLoading ? <LoadingIndicator /> : getComponentBody();
};

export default AuthorizeComponent;
