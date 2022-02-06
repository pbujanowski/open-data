import { Request, Response } from "express";

import { NbpService } from "../services";

const nbpController = () => {
  const getCurrentGoldPrice = async (req: Request, res: Response) => {
    try {
      const goldPrice = await NbpService.getCurrentGoldPrice();
      res.json(goldPrice);
    } catch (e) {
      res.status(500);
    }
  };

  const getGoldPricesByDate = async (req: Request, res: Response) => {
    try {
      const dateNow = new Date(Date.now());
      const formattedDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`;
      const startDate = req.query.startDate?.toString() || formattedDate;
      const endDate = req.query.endDate?.toString() || formattedDate;
      const goldPrices = await NbpService.getGoldPricesByDate(startDate, endDate);
      res.json(goldPrices);
    } catch (e) {
      res.status(500);
    }
  };

  return {
    getCurrentGoldPrice,
    getGoldPricesByDate,
  };
};

const NbpController = nbpController();

export default NbpController;
