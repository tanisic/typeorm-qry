import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { importEntities } from "./entity-import";
import Sqlite3Database, { type Database } from "better-sqlite3";
import { SeederOptions, runSeeders } from "typeorm-extension";
import { importFactories } from "./factory-import";
import RootSeeder from "../seeders/root.seeder";

class DatabaseManager {
  private datasourceOptions: DataSourceOptions & SeederOptions;
  private dataSource: DataSource;
  private testDatabase: Database;
  constructor(config: DataSourceOptions) {
    this.datasourceOptions = config;
  }

  getDataSource() {
    return this.dataSource;
  }
  /**
   * @param relPath - relative path to TypeORM entities folder
   */
  async initialize() {
    this.testDatabase = new Sqlite3Database(":memory:");

    // Dynamically import entities
    const entities = await importEntities("../entities");
    const factories = await importFactories("../seeders/factory");

    this.dataSource = new DataSource({
      ...this.datasourceOptions,
      synchronize: true,
      entities,
      factories,
      seeds: [RootSeeder],
    } as DataSourceOptions & SeederOptions);

    await this.dataSource
      .initialize()
      .then(async () => {
        console.log("Database connection initialized");
        await this.dataSource.synchronize(true);
        console.log("Running seeders");
        await runSeeders(this.dataSource);
      })
      .catch((error) => console.log(error));
  }

  async destroy() {
    await this.dataSource.destroy();
    this.testDatabase.close();
    console.log("Database connection destroyed");
  }
}

export default DatabaseManager;
