import express from "express";

import { nbpController } from "../controllers";

const nbpRoutes = () => {
  const router = express.Router();

  router.get("/currentGoldPrice", nbpController().getCurrentGoldPrice);
  router.get("/goldPricesCount", nbpController().getGoldPricesCount);
  router.get("/goldPricesByDates/:startDate/:endDate", nbpController().getGoldPricesByDates);
  router.get("/goldPrices", nbpController().getGoldPricesWithPagination);
  router.post("/synchronizeGoldPricesByDates", nbpController().synchronizeGoldPricesByDates);

  return router;
};

export { nbpRoutes };
