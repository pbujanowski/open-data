import express from "express";

import { homeController } from "../controllers";

const homeRoutes = () => {
  const router = express.Router();

  router.get("/", homeController().index);

  return router;
};

export { homeRoutes };
