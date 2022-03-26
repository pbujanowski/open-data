import { useCallback, useEffect, useState } from "react";
import { authService } from "services";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleIsAuthenticated = () => {
    authService()
      .isAuthenticated()
      .then((result) => setIsAuthenticated(result));
  };

  const handleUserChanged = useCallback(() => handleIsAuthenticated(), []);

  useEffect(() => {
    try {
      setIsLoading(true);
      authService().getEvents().addUserLoaded(handleUserChanged);
      authService().getEvents().addUserUnloaded(handleUserChanged);
      handleIsAuthenticated();
    } finally {
      setIsLoading(false);
    }
  }, [handleUserChanged]);

  return { isLoading, isAuthenticated, authService };
};

export { useAuth };
