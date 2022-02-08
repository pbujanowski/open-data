import express from "express";

import { nbpController } from "../controllers";

const nbpRoutes = () => {
  const router = express.Router();

  router.get("/currentGoldPrice", nbpController().getCurrentGoldPrice);
  router.get("/goldPricesByDate/:startDate/:endDate", nbpController().getGoldPricesByDate);

  return router;
};

export { nbpRoutes };
