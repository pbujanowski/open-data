import express from "express";

import { HomeController } from "../controllers";

const homeRoutes = () => {
  const router = express.Router();

  router.get("/", HomeController.index);

  return router;
};

const HomeRoutes = homeRoutes();

export default HomeRoutes;
