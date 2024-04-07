import { beforeAll, describe, test, afterAll, expect } from "vitest";
import User from "../lib/database/entities/user.entity";
import Address from "../lib/database/entities/address.entity";
import { dbManager } from "../lib/database/db-test-helper/instance";
import { QueryBuilder } from "../src/index";
import Role from "../lib/database/entities/role.entity";

describe("Include builder", () => {
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

  test("Valid simple include", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ include: "address" }, repo);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyPath
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
  });

  test("Invalid simple include", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    expect(
      () => new QueryBuilder({ include: "some_unknown_relation" }, repo)
    ).toThrowError();
  });

  test("Multiple simple includes", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ include: "address,manager" }, repo);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyPath
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.propertyPath
    ).toEqual("manager");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.type
    ).toEqual(User);
  });

  test("Multiple simple includes with trim", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ include: " address , manager" }, repo);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyPath
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.propertyPath
    ).toEqual("manager");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.type
    ).toEqual(User);
  });

  test("Valid nested include", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ include: "address.user" }, repo);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyName
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.propertyName
    ).toEqual("user");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.target
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.type
    ).toEqual(User);
  });

  test("Multiple nested include", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder({ include: "address.user,roles.users" }, repo);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyName
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.propertyName
    ).toEqual("user");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.target
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.type
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.propertyName
    ).toEqual("roles");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.type
    ).toEqual(Role);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.propertyName
    ).toEqual("users");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.target
    ).toEqual(Role);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.type
    ).toEqual(User);
  });

  test("Multiple nested include with trim", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      { include: "address . user ,roles .users " },
      repo
    );
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.propertyName
    ).toEqual("address");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[0].relation?.type
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.propertyName
    ).toEqual("user");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.target
    ).toEqual(Address);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[1].relation?.type
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.propertyName
    ).toEqual("roles");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.target
    ).toEqual(User);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[2].relation?.type
    ).toEqual(Role);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.propertyName
    ).toEqual("users");
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.target
    ).toEqual(Role);
    expect(
      qb.queryBuilder.expressionMap.joinAttributes[3].relation?.type
    ).toEqual(User);
  });
});
