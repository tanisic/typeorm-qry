import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from "typeorm-extension";
import { join } from "path";
import RootSeeder from "./seeders/root.seeder";

const config: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "typeorm_test",
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "/entities/**/*{.ts,.js}")],
  factories: [join(__dirname, "/seeders/factory/**/*{.ts,.js}")],
  seeds: [RootSeeder],
};

const dataSource = new DataSource(config);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});