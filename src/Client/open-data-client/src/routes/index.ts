import { Home as HomeIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

import { Home, Nbp } from "../pages";

export type RouteType = {
  key: string;
  path: string;
  component: React.ElementType;
  icon?: React.ElementType;
};

const homeRoute: RouteType = {
  key: "home",
  path: "/",
  component: Home,
  icon: HomeIcon,
};

const nbpRoute: RouteType = {
  key: "nbp",
  path: "/nbp",
  component: Nbp,
  icon: AccountBalanceIcon,
};

const routes: RouteType[] = [homeRoute, nbpRoute];

const menuRoutes: RouteType[] = [homeRoute, nbpRoute];

export { homeRoute, nbpRoute, routes, menuRoutes };
