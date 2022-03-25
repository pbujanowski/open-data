import { Home as HomeIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

import { Home, Login, NationalBank } from "pages";

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

const nationalBankRoute: RouteType = {
  key: "nationalBank",
  path: "/national-bank",
  component: NationalBank,
  icon: AccountBalanceIcon,
};

const routes: RouteType[] = [homeRoute, loginRoute, nationalBankRoute];

const menuRoutes: RouteType[] = [homeRoute, nationalBankRoute];

export { homeRoute, loginRoute, nationalBankRoute, routes, menuRoutes };
