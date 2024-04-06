import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { importEntities } from "./entity-import";

class DatabaseManager {
  private datasourceOptions: DataSourceOptions;
  private dataSource: DataSource;

  constructor(config: DataSourceOptions) {
    this.datasourceOptions = config;
  }

  getDataSource() {
    return this.dataSource;
  }
  /**
   * @param relPath - relative path to TypeORM entities folder
   */
  async initialize(relPath?: string) {
    const entities = await importEntities(relPath ?? "../entities");

    this.dataSource = new DataSource({
      ...this.datasourceOptions,
      entities,
    });

    await this.dataSource
      .initialize()
      .then(() => {
        console.log("Data source initialized");
      })
      .catch((error) => console.log(error));
  }

  async destroy() {
    await this.dataSource.destroy();
  }
}

export default DatabaseManager;
