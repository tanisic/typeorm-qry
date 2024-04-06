import { beforeAll, describe, test, afterAll, expect } from "vitest";
import { dbManager } from "lib/database/db-test-helper/instance";
import { QueryBuilder } from "src/query-builder";
import User from "../../lib/database/entities/user.entity";

describe("Sort builder", () => {
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

  test("Simple sort ASC", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: "firstName" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user.firstName": "ASC",
    });
  });

  test("Simple sort DESC", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: "-lastName" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user.lastName": "DESC",
    });
  });

  test("Relation sort ASC", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: "roles.name" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user_roles.name": "ASC",
    });
  });
  test("Relation sort DESC", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: "-roles.name" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user_roles.name": "DESC",
    });
  });

  test("Multiple simple sorts", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: "firstName,lastName" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user.firstName": "ASC",
      "user.lastName": "ASC",
    });
  });
  test("Multiple simple sorts test trim", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: " firstName , lastName" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user.firstName": "ASC",
      "user.lastName": "ASC",
    });
  });
  test("Multiple relation sorts test trim", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ sort: " firstName , -roles.lastName" }, repo);
    expect(qb.queryBuilder.expressionMap.orderBys).toMatchObject({
      "user.firstName": "ASC",
      "user_roles.lastName": "DESC",
    });
  });
});
