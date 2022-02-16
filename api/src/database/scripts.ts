import { readFileSync } from "fs";

const scripts = () => {
  const rootPath = "src/database/sql/scripts";

  const beginTransaction = () => "BEGIN TRANSACTION;";

  const commitTransaction = () => "COMMIT;";

  const rollbackTransaction = () => "ROLLBACK;";

  const insertGoldPrice = () => readFileSync(`${rootPath}/insert_gold_price.sql`).toString();

  const selectAllGoldPrices = () => readFileSync(`${rootPath}/select_all_gold_prices.sql`).toString();

  const selectGoldPricesByDates = () => readFileSync(`${rootPath}/select_gold_prices_by_dates.sql`).toString();

  return {
    beginTransaction,
    commitTransaction,
    rollbackTransaction,
    insertGoldPrice,
    selectAllGoldPrices,
    selectGoldPricesByDates,
  };
};

export { scripts };
