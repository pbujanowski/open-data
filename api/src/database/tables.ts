import { readFileSync } from "fs";

const tables = () => {
  const rootPath = "src/database/sql/tables";

  const goldPrices = () => readFileSync(`${rootPath}/gold_prices.sql`).toString();

  return { goldPrices };
};

export { tables };
