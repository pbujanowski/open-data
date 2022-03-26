import { useCallback, useEffect, useState } from "react";
import { User } from "oidc-client-ts";
import { authService } from "services";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleIsAuthenticated = () => {
    authService()
      .isAuthenticated()
      .then((result) => setIsAuthenticated(result));
  };

  const handleUserChanged = useCallback(() => {
    authService()
      .getUser()
      .then((result) => setUser(result));
    handleIsAuthenticated();
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      authService().getEvents().addUserLoaded(handleUserChanged);
      authService().getEvents().addUserUnloaded(handleUserChanged);
      handleUserChanged();
    } finally {
      setIsLoading(false);
    }
  }, [handleUserChanged]);

  return { isLoading, isAuthenticated, user, authService };
};

export { useAuth };
