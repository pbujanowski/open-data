import { GoldPriceDto } from "open-data-common";
import { v4 as uuid } from "uuid";
import { database } from "../database";

const goldPriceRepository = () => {
  const createGoldPrice = (goldPrice: GoldPriceDto) => {
    const connection = database().connection().createConnection();
    try {
      connection.run(
        database().scripts().insertGoldPrice(),
        [goldPrice.id || uuid(), goldPrice.date, goldPrice.price],
        handleError,
      );
    } finally {
      connection.close();
    }
  };

  const createGoldPrices = (goldPrices: GoldPriceDto[]) => {
    const connection = database().connection().createConnection();
    try {
      connection.run(database().scripts().beginTransaction(), handleError);
      goldPrices.forEach((goldPrice) => {
        connection.run(
          database().scripts().insertGoldPrice(),
          [goldPrice.id || uuid(), goldPrice.date, goldPrice.price],
          handleError,
        );
      });
      connection.run(database().scripts().commitTransaction(), handleError);
    } catch {
      connection.run(database().scripts().rollbackTransaction(), handleError);
    } finally {
      connection.close();
    }
  };

  const findAllGoldPrices = () => {
    const connection = database().connection().createConnection();
    try {
      const goldPrices: GoldPriceDto[] = [];
      connection.each(database().scripts().selectAllGoldPrices(), (err, row) => {
        handleError(err);
        goldPrices.push({
          id: row.id,
          date: row.date,
          price: row.price,
        });
      });
      return goldPrices;
    } finally {
      connection.close();
    }
  };

  const findGoldPricesByDates = (startDate: string, endDate: string) => {
    const connection = database().connection().createConnection();
    try {
      const goldPrices: GoldPriceDto[] = [];
      connection.each(database().scripts().selectGoldPricesByDates(), [startDate, endDate], (err, row) => {
        handleError(err);
        goldPrices.push({
          id: row.id,
          date: row.date,
          price: row.price,
        });
      });
      return goldPrices;
    } finally {
      connection.close();
    }
  };

  const handleError = (err: Error | null) => {
    if (err) {
      throw err;
    }
  };

  return { createGoldPrice, createGoldPrices, findAllGoldPrices, findGoldPricesByDates };
};

export { goldPriceRepository };
