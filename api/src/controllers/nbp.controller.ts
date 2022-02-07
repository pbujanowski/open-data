import { NextFunction, Request, Response } from "express";

import { NbpService } from "../services";

const nbpController = () => {
  const getCurrentGoldPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goldPrice = await NbpService.getCurrentGoldPrice();
      res.json(goldPrice);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  const getGoldPricesByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate = req.params.startDate;
      const endDate = req.params.endDate;
      const goldPrices = await NbpService.getGoldPricesByDate(startDate, endDate);
      res.json(goldPrices);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  return {
    getCurrentGoldPrice,
    getGoldPricesByDate,
  };
};

const NbpController = nbpController();

export default NbpController;
