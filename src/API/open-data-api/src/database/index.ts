import { ConnectionManager, ConnectionOptions } from "typeorm";

const database = () => {
  const connectionManager = new ConnectionManager();

  const connectionOptions: ConnectionOptions = {
    type: "sqlite",
    database: "open-data.db",
    synchronize: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
  };

  const createConnection = () => connectionManager.create(connectionOptions);

  return { createConnection };
};

export { database };
