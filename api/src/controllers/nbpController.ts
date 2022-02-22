import { NextFunction, Request, Response } from "express";
import { GoldPriceDto, GoldPricesCountDto, GoldPricesByDatesDto } from "open-data-common";

import { nbpService } from "../services";
import { goldPriceRepository } from "../repositories";
import { GoldPrice } from "../entities";

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

  const getGoldPricesCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate = req.query.startDate?.toString();
      const endDate = req.query.endDate?.toString();
      const count = await goldPriceRepository().countGoldPrices(startDate, endDate);
      const goldPricesCount: GoldPricesCountDto = {
        count,
      };
      res.json(goldPricesCount);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  const getGoldPricesWithFilters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNumber = Number.parseInt(req.query.pageNumber?.toString() || "1");
      const pageSize = Number.parseInt(req.query.pageSize?.toString() || "10");
      const startDate = req.query.startDate?.toString();
      const endDate = req.query.endDate?.toString();
      const goldPrices = await goldPriceRepository().findGoldPricesWithFilters(
        pageNumber,
        pageSize,
        startDate,
        endDate,
      );
      res.json(goldPrices);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  const synchronizeGoldPricesByDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as GoldPricesByDatesDto;
      const goldPricesDto = await nbpService().getGoldPricesByDates(body.startDate, body.endDate);
      const goldPricesEntities = goldPricesDto.map((goldPrice) => {
        const item = new GoldPrice();
        item.date = new Date(goldPrice.date);
        item.price = goldPrice.price;
        return item;
      });
      const createdEntities = await goldPriceRepository().createGoldPrices(goldPricesEntities);
      const createdDto: GoldPriceDto[] = createdEntities.map((goldPrice) => ({
        id: goldPrice.id,
        date: goldPrice.date.toString(),
        price: goldPrice.price,
      }));
      res.json(createdDto);
    } catch (e) {
      res.status(500);
      next(e);
    }
  };

  return {
    getCurrentGoldPrice,
    getGoldPricesCount,
    getGoldPricesWithFilters,
    synchronizeGoldPricesByDates,
  };
};

export { nbpController };
