import { Database } from "sqlite3";

const connection = () => {
  const connectionString = "open-data.db";

  const createConnection = () => new Database(connectionString);

  return { createConnection };
};

export { connection };
