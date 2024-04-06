import { DataSourceOptions } from "typeorm";
import DatabaseManager from "./database-manager";

const datasourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "typeorm_test",
  synchronize: true,
  // logging: true,
};

export const dbManager = new DatabaseManager(datasourceOptions);
