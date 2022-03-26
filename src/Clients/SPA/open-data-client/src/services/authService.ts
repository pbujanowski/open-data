import {
  SigninRedirectArgs,
  SignoutRedirectArgs,
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client-ts";

import { authConfig } from "configs";

const settings: UserManagerSettings = {
  automaticSilentRenew: true,
  authority: authConfig().authority,
  client_id: authConfig().clientId,
  loadUserInfo: true,
  post_logout_redirect_uri: `${window.location.origin}/logout-callback`,
  redirect_uri: `${window.location.origin}/login-callback`,
  response_type: authConfig().responseType,
  scope: authConfig().scope,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const userManager = new UserManager(settings);

const authService = () => {
  const signinRedirect = (args?: SigninRedirectArgs | undefined) => userManager.signinRedirect(args);

  const signinRedirectCallback = (url?: string | undefined) => userManager.signinRedirectCallback(url);

  const signoutRedirect = (args?: SignoutRedirectArgs | undefined) => userManager.signoutRedirect(args);

  const signoutRedirectCallback = (url?: string | undefined) => userManager.signoutRedirectCallback(url);

  const getUser = () => userManager.getUser();

  const storeUser = (user: User | null) => userManager.storeUser(user);

  const isAuthenticated = async () => (await userManager.getUser()) !== null;

  const getEvents = () => userManager.events;

  return {
    signinRedirect,
    signinRedirectCallback,
    signoutRedirect,
    signoutRedirectCallback,
    getUser,
    storeUser,
    isAuthenticated,
    getEvents,
  };
};

export { authService };
