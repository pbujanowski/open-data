import { Home as HomeIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

import { Home, Login, LoginCallback, LogoutCallback, NationalBank } from "pages";

export type RouteType = {
  key: string;
  path: string;
  component: React.ElementType;
  icon?: React.ElementType;
  authorize?: boolean;
};

const homeRoute: RouteType = {
  key: "home",
  path: "/",
  component: Home,
  icon: HomeIcon,
};

const loginRoute: RouteType = {
  key: "login",
  path: "/login",
  component: Login,
};

const loginCallbackRoute: RouteType = {
  key: "loginCallback",
  path: "/login-callback",
  component: LoginCallback,
};

const logoutCallbackRoute: RouteType = {
  key: "logoutCallback",
  path: "/logout-callback",
  component: LogoutCallback,
};

const nationalBankRoute: RouteType = {
  key: "nationalBank",
  path: "/national-bank",
  component: NationalBank,
  icon: AccountBalanceIcon,
};

const routes: RouteType[] = [homeRoute, loginRoute, loginCallbackRoute, logoutCallbackRoute, nationalBankRoute];

const menuRoutes: RouteType[] = [homeRoute, nationalBankRoute];

export { homeRoute, loginRoute, loginCallbackRoute, logoutCallbackRoute, nationalBankRoute, routes, menuRoutes };
