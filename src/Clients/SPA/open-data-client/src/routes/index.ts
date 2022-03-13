import { Home as HomeIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

import { Home, NationalBank } from "../pages";

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

const nationalBankRoute: RouteType = {
  key: "nationalBank",
  path: "/nationalBank",
  component: NationalBank,
  icon: AccountBalanceIcon,
};

const routes: RouteType[] = [homeRoute, nationalBankRoute];

const menuRoutes: RouteType[] = [homeRoute, nationalBankRoute];

export { homeRoute, nationalBankRoute, routes, menuRoutes };
