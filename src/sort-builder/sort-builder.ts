import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { QueryParams } from "../types";

export class SortBuilder<T extends ObjectLiteral> {
  private rawQuery: QueryParams;
  private queryBuilder: SelectQueryBuilder<T>;
  private repository: Repository<T>;
  private rootAlias: string;

  constructor(
    query: QueryParams,
    queryBuilder: SelectQueryBuilder<T>,
    repository: Repository<T>,
  ) {
    this.rawQuery = { ...query };
    this.queryBuilder = queryBuilder;
    this.repository = repository;
    this.rootAlias = this.repository.metadata.name.toLowerCase();
    const sorts = this.rawQuery.sort?.split(",") || [];

    for (const sort of sorts) {
      this.addSort(sort);
    }
  }

  addSort(sortString: string) {
    let order: "ASC" | "DESC" = "ASC";

    if (sortString.startsWith("-")) {
      order = "DESC";
      sortString = sortString.slice(1);
    }

    const splitted = sortString.split(".");

    if (splitted.length === 1) {
      sortString = `${this.rootAlias}.${sortString}`;
    } else if (splitted.length > 1) {
      const splittedCopy = [...splitted];
      splittedCopy.unshift(this.rootAlias);
      const property = splittedCopy.pop();
      const relation = splittedCopy.join("_");
      sortString = `${relation}.${property}`;
    }

    this.queryBuilder.addOrderBy(sortString, order);
  }
}
