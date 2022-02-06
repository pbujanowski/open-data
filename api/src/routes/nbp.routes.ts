import express from "express";

import { NbpController } from "../controllers";

const nbpRoutes = () => {
  const router = express.Router();

  router.get("/currentGoldPrice", NbpController.getCurrentGoldPrice);

  return router;
};

const NbpRoutes = nbpRoutes();

export default NbpRoutes;
