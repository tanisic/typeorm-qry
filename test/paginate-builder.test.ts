import { beforeAll, describe, test, afterAll, expect } from "vitest";
import User from "../lib/database/entities/user.entity";
import { dbManager } from "../lib/database/db-test-helper/instance";
import { QueryBuilder } from "../src/index";

describe("Paginate builder", () => {
  beforeAll(async () => {
    await dbManager.initialize();
  });
  afterAll(async () => {
    await dbManager.destroy();
  });

  test("Repo initalized", async () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(repo).toBeDefined();
    expect(repo.target).toEqual(User);
    expect(repo.metadata).toBeDefined();
  });

  test("Valid paginate", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ paginate: { page: 1, perPage: 10 } }, repo);
    expect(qb.queryBuilder.expressionMap.skip).toEqual(0);
    expect(qb.queryBuilder.expressionMap.take).toEqual(10);
  });

  test("Invalid paginate - missing page", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(
      () => new QueryBuilder({ paginate: { perPage: 10 } }, repo)
    ).toThrowError();
  });

  test("Invalid paginate - missing perPage", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(
      () => new QueryBuilder({ paginate: { page: 1 } }, repo)
    ).toThrowError();
  });

  test("Invalid paginate - page invalid value", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(
      () =>
        new QueryBuilder({ paginate: { page: "a1234df", perPage: 10 } }, repo)
    ).toThrowError();
  });

  test("Invalid paginate - perPage invalid value", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(
      () =>
        new QueryBuilder({ paginate: { page: 10, perPage: "1234df" } }, repo)
    ).toThrowError();
  });

  test("Valid paginate - page is numeric string", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      { paginate: { page: "12", perPage: 10 } },
      repo
    );
    expect(qb.queryBuilder.expressionMap.take).toEqual(10);
    expect(qb.queryBuilder.expressionMap.skip).toEqual(110);
  });

  test("Valid paginate - perPage is numeric string", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      { paginate: { page: 12, perPage: "10" } },
      repo
    );
    expect(qb.queryBuilder.expressionMap.take).toEqual(10);
    expect(qb.queryBuilder.expressionMap.skip).toEqual(110);
  });
});
