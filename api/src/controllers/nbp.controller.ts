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

  return {
    getCurrentGoldPrice,
  };
};

const NbpController = nbpController();

export default NbpController;
