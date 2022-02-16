import { Database } from "sqlite3";
import { connection } from "./connection";
import { tables } from "./tables";
import { scripts } from "./scripts";

const database = () => {
  const { createConnection } = connection();

  const initDatabase = () => {
    let connection: Database | null = null;
    try {
      connection = createConnection();
      connection.run(tables().goldPrices());
    } finally {
      connection?.close();
    }
  };

  return { connection, initDatabase, tables, scripts };
};

export { database };
