import "reflect-metadata";
import fs from "fs/promises";
import path from "path";
import { SeederFactoryItem } from "typeorm-extension";

export async function importFactories(
  directoryPath?: string
): Promise<(SeederFactoryItem | string)[]> {
  const baseDirectory = __dirname;
  try {
    if (directoryPath) {
      directoryPath = path.join(baseDirectory, directoryPath);
    }
    const entries = await fs.readdir(directoryPath);
    const entities: (SeederFactoryItem | string)[] = [];

    for (const entry of entries) {
      const entryPath = path.join(directoryPath, entry);
      const entryStat = await fs.stat(entryPath);
      if (entryStat.isFile() && entry.endsWith(".factory.ts")) {
        const moduleExport = await import(entryPath);
        if (
          moduleExport.default &&
          typeof moduleExport.default === "function"
        ) {
          entities.push(moduleExport.default);
        }
      } else if (entryStat.isDirectory()) {
        const subEntities = await importFactories(entryPath);
        entities.push(...subEntities);
      }
    }

    return entities;
  } catch (error) {
    console.error("Error importing models:", error);
    throw error;
  }
}
