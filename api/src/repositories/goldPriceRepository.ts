import { Between } from "typeorm";

import { database } from "../database";
import { GoldPrice } from "../entities";

const goldPriceRepository = () => {
  const { createConnection } = database();
  const connection = createConnection();

  const createGoldPrice = async (goldPrice: GoldPrice) => {
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      const created = repository.create(goldPrice);
      await repository.save(created);
      return created;
    } finally {
      await connection.close();
    }
  };

  const createGoldPrices = async (goldPrices: GoldPrice[]) => {
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      const created = repository.create(goldPrices);
      await repository.save(created);
      return created;
    } finally {
      await connection.close();
    }
  };

  const countAllGoldPrices = async () => {
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      return await repository.count();
    } finally {
      await connection.close();
    }
  };

  const findAllGoldPrices = async () => {
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      return await repository.find();
    } finally {
      await connection.close();
    }
  };

  const findGoldPricesByDates = async (startDate: string, endDate: string) => {
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      return await repository.find({
        where: {
          date: Between(new Date(startDate), new Date(endDate)),
        },
      });
    } finally {
      await connection.close();
    }
  };

  const findGoldPricesWithPagination = async (pageNumber: number, pageSize: number) => {
    const take = pageSize;
    const skip = pageSize * (pageNumber - 1);
    await connection.connect();
    try {
      const repository = connection.getRepository(GoldPrice);
      return await repository.find({ take, skip });
    } finally {
      await connection.close();
    }
  };

  return {
    createGoldPrice,
    createGoldPrices,
    countAllGoldPrices,
    findAllGoldPrices,
    findGoldPricesByDates,
    findGoldPricesWithPagination,
  };
};

export { goldPriceRepository };
