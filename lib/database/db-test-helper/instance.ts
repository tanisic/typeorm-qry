import { DataSourceOptions } from "typeorm";
import DatabaseManager from "./database-manager";

const datasourceOptions: DataSourceOptions = {
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  dropSchema: true,
  // logging: true,
};

export const dbManager = new DatabaseManager(datasourceOptions);
