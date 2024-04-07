import { type ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { type QueryParams } from "../types";
import { type Paginate } from "./types";
import { type PaginateBuilderOptions } from "../query-builder";
import { isInteger } from "../utils/utils";

export class PaginateBuilder<T extends ObjectLiteral> {
  private rawQuery: QueryParams;
  private queryBuilder: SelectQueryBuilder<T>;
  private options: PaginateBuilderOptions;

  constructor(
    query: QueryParams,
    queryBuilder: SelectQueryBuilder<T>,
    options: PaginateBuilderOptions
  ) {
    this.rawQuery = { ...query };
    this.queryBuilder = queryBuilder;
    this.options = { ...options };
    const pagination = this.rawQuery["paginate"];
    this.paginate(pagination);
  }

  paginate(paginate: Paginate | undefined) {
    if (!paginate) return;
    if (
      (paginate.page && !paginate.perPage) ||
      (!paginate.page && paginate.perPage)
    ) {
      throw new Error("Paginate 'page' and 'perPage' must be sent together.");
    }
    if (!isInteger(paginate.page) || !isInteger(paginate.perPage)) {
      throw new Error("Paginate page is not valid integer.");
    }
    if (!isInteger(paginate.perPage)) {
      throw new Error("Paginate perPage is not integer.");
    }

    const page = (paginate.page as number) - 1;
    const perPage = paginate.perPage as number;
    const maxPerPage = this.options.maxPerPage;

    if (maxPerPage && perPage > maxPerPage) {
      throw new Error("Paginate perPage exceeded maxPerPage.");
    }
    if (page === 0 && perPage === 0) {
      throw new Error("Paginate page and perPage must be greater than 0.");
    }

    this.queryBuilder.skip(page * perPage).take(perPage);
  }
}
