import { NextFunction, Request, Response } from "express";
import { GoldPricesByDatesDto } from "open-data-common";

import { nbpService } from "../services";
import { goldPriceRepository } from "../repositories";

const nbpController = () => {
  const getCurrentGoldPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goldPrice = await nbpService().getCurrentGoldPrice();
      res.json(goldPrice);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  const getGoldPricesByDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate = req.params.startDate;
      const endDate = req.params.endDate;
      const goldPrices = goldPriceRepository().findGoldPricesByDates(startDate, endDate);
      res.json(goldPrices);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  const synchronizeGoldPricesByDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as GoldPricesByDatesDto;
      const goldPrices = await nbpService().getGoldPricesByDates(body.startDate, body.endDate);
      goldPriceRepository().createGoldPrices(goldPrices);
      res.json(goldPrices);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  return {
    getCurrentGoldPrice,
    getGoldPricesByDates,
    synchronizeGoldPricesByDates,
  };
};

export { nbpController };
