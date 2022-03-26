import {
  SigninRedirectArgs,
  SignoutRedirectArgs,
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client-ts";

const settings: UserManagerSettings = {
  automaticSilentRenew: true,
  authority: "https://localhost:5001",
  client_id: "open-data-client",
  loadUserInfo: true,
  post_logout_redirect_uri: "http://localhost:3000/logout-callback",
  redirect_uri: "http://localhost:3000/login-callback",
  response_type: "code",
  scope: "openid profile email open-data-api",
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

  return {
    signinRedirect,
    signinRedirectCallback,
    signoutRedirect,
    signoutRedirectCallback,
    getUser,
    storeUser,
    isAuthenticated,
  };
};

export { authService };
