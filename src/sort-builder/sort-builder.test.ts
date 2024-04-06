import { beforeAll, describe, test, afterAll, expect } from "vitest";
import { dbManager } from "lib/database/db-test-helper/instance";
import User from "lib/database/entities/user.entity";

describe("Sort builder", () => {
  beforeAll(async () => {
    await dbManager.initialize();
  });
  afterAll(async () => {
    await dbManager.destroy();
  });

  test("Repo initalized", () => {
    const repo = dbManager.getDataSource().getRepository(User);
    console.log({ repo });
    expect(repo).toBeDefined();
    expect(repo.target).toEqual(User);
  });
});
