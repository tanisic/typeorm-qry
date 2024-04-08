import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import { type SeederOptions, runSeeders } from "typeorm-extension";
import { join } from "path";
import RootSeeder from "./seeders/root.seeder";

const config: DataSourceOptions & SeederOptions = {
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  // logging: true,
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
