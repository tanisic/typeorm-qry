import { beforeAll, describe, test, afterAll, expect } from "vitest";
import User from "../lib/database/entities/user.entity";
import { dbManager } from "../lib/database/db-test-helper/instance";
import { FilterOperand, QueryBuilder } from "../src/index";
import { WhereWrappingOperator } from "typeorm/query-builder/WhereClause";

describe("Filter builder", () => {
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

  test("Valid simple filter", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      { filter: [{ name: "firstName", op: FilterOperand.eq, val: "Matt" }] },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("and");
    expect(qb.queryBuilder.expressionMap.wheres[0].condition).includes(
      "user.firstName ="
    );
  });

  test("Valid simple indirect AND filter", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      {
        filter: [
          { name: "firstName", op: FilterOperand.eq, val: "Matt" },
          { name: "lastName", op: FilterOperand.eq, val: "Waltz" },
        ],
      },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("and");
    expect(qb.queryBuilder.expressionMap.wheres[0].condition).includes(
      "user.firstName ="
    );
    expect(qb.queryBuilder.expressionMap.wheres[1].type).toEqual("and");
    expect(qb.queryBuilder.expressionMap.wheres[1].condition).includes(
      "user.lastName ="
    );
  });

  test("Valid simple AND filter", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      {
        filter: [
          {
            and: [
              { name: "firstName", op: FilterOperand.eq, val: "Matt" },
              { name: "lastName", op: FilterOperand.eq, val: "Waltz" },
            ],
          },
        ],
      },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("and");
    expect(qb.queryBuilder.expressionMap.wheres[0].condition).toHaveProperty(
      "operator",
      "brackets"
    );
    expect(
      (
        qb.queryBuilder.expressionMap.wheres[0]
          .condition as WhereWrappingOperator
      ).condition
    ).toHaveLength(2);
  });

  test("Valid simple AND filter with 3 queries", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      {
        filter: [
          {
            and: [
              { name: "firstName", op: FilterOperand.eq, val: "Matt" },
              { name: "lastName", op: FilterOperand.eq, val: "Waltz" },
              { name: "isActive", op: FilterOperand.eq, val: true },
            ],
          },
        ],
      },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("and");
    expect(qb.queryBuilder.expressionMap.wheres[0].condition).toHaveProperty(
      "operator",
      "brackets"
    );
    expect(
      (
        qb.queryBuilder.expressionMap.wheres[0]
          .condition as WhereWrappingOperator
      ).condition
    ).toHaveLength(3);
  });

  test("Valid simple OR filter", () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      {
        filter: [
          {
            or: [
              { name: "firstName", op: FilterOperand.like, val: "man" },
              { name: "lastName", op: FilterOperand.eq, val: "Waltz" },
            ],
          },
        ],
      },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("or");
    expect(qb.queryBuilder.expressionMap.wheres[0].condition).toHaveProperty(
      "operator",
      "brackets"
    );
    expect(
      (
        qb.queryBuilder.expressionMap.wheres[0]
          .condition as WhereWrappingOperator
      ).condition
    ).toHaveLength(2);
  });

  test("Valid NOT filter", async () => {
    const source = dbManager.getDataSource();
    const repo = source.getRepository(User);
    const qb = new QueryBuilder(
      {
        filter: [
          {
            not: [
              { name: "firstName", op: FilterOperand.like, val: "man" },
              { name: "lastName", op: FilterOperand.eq, val: "Waltz" },
            ],
          },
        ],
      },
      repo
    );
    expect(qb.queryBuilder.expressionMap.wheres[0].type).toEqual("and");
    expect(
      (
        qb.queryBuilder.expressionMap.wheres[0]
          .condition as WhereWrappingOperator
      ).operator
    ).toEqual("not");
    expect(
      (
        qb.queryBuilder.expressionMap.wheres[0]
          .condition as WhereWrappingOperator
      ).condition
    ).toHaveLength(2);
  });
});
