import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { QueryParams } from "../types";

export class PaginateBuilder<T extends ObjectLiteral> {
  private rawQuery: QueryParams;
  private queryBuilder: SelectQueryBuilder<T>;

  constructor(query: QueryParams, queryBuilder: SelectQueryBuilder<T>) {
    this.rawQuery = { ...query };
    this.queryBuilder = queryBuilder;

    const paginate = this.rawQuery["paginate"];

    if (paginate?.page && paginate?.perPage)
      this.paginate(Number(paginate.page), Number(paginate.perPage));
  }

  paginate(page: number, perPage: number) {
    const skip = page * perPage;
    const take = perPage;
    this.queryBuilder.skip(skip).take(take);
  }
}
