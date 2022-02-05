import { Home, Nbp } from "../pages";

export type RouteType = {
  key: string;
  path: string;
  component: React.ElementType;
};

export const homeRoute: RouteType = {
  key: "home",
  path: "/",
  component: Home,
};

export const nbpRoute: RouteType = {
  key: "nbp",
  path: "/nbp",
  component: Nbp,
};

export const routes: RouteType[] = [homeRoute, nbpRoute];

export const menuRoutes: RouteType[] = [homeRoute, nbpRoute];
