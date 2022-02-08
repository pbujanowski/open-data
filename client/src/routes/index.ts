import { Home, Nbp } from "../pages";

export type RouteType = {
  key: string;
  path: string;
  component: React.ElementType;
};

const homeRoute: RouteType = {
  key: "home",
  path: "/",
  component: Home,
};

const nbpRoute: RouteType = {
  key: "nbp",
  path: "/nbp",
  component: Nbp,
};

const routes: RouteType[] = [homeRoute, nbpRoute];

const menuRoutes: RouteType[] = [homeRoute, nbpRoute];

export { homeRoute, nbpRoute, routes, menuRoutes };
