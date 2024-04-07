import { type ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { FilterBuilder } from "../filter-builder/filter-builder";
import { IncludeBuilder } from "../include-builder/include-builder";
import { SortBuilder } from "../sort-builder/sort-builder";
import { type QueryBuilderOptions } from "./types";
import { deepMerge } from "../utils/utils";
import { type QueryParams } from "../types";
import { PaginateBuilder } from "../paginate-builder";

export class QueryBuilder<T extends ObjectLiteral> {
  protected rawQuery: QueryParams;
  protected filter?: FilterBuilder<T>;
  protected include?: IncludeBuilder<T>;
  protected sort?: SortBuilder<T>;
  protected paginate?: PaginateBuilder<T>;
  public readonly queryBuilder: SelectQueryBuilder<T>;
  public readonly repository: Repository<T>;
  protected rootAlias: string;
  protected options: QueryBuilderOptions;

  constructor(
    query: QueryParams,
    repository: Repository<T>,
    options: QueryBuilderOptions = {}
  ) {
    this.rawQuery = { ...query };
    this.options = {};
    this.mergeOptions(options);
    this.repository = repository;
    this.rootAlias = this.repository.metadata.name.toLowerCase();
    this.queryBuilder = this.repository.createQueryBuilder(this.rootAlias);

    this.initializeIncludeBuilder();
    this.initializeFilterBuilder();
    this.initializeSortBuilder();
    this.initializePaginateBuilder();
  }

  private defaultOptions: QueryBuilderOptions = {
    filter: {
      disabled: false,
    },
    sort: {
      disabled: false,
    },
    include: {
      disabled: false,
    },
    paginate: {
      disabled: false,
    },
  };

  private mergeOptions(options?: QueryBuilderOptions) {
    deepMerge(this.options, this.defaultOptions, options);
  }

  private initializeIncludeBuilder() {
    if (!this.options.include?.disabled) {
      this.include = new IncludeBuilder(
        this.rawQuery,
        this.queryBuilder,
        this.repository
      );
    }
  }

  private initializeFilterBuilder() {
    if (!this.options?.filter?.disabled) {
      this.filter = new FilterBuilder(this.rawQuery, this.queryBuilder);
    }
  }
  private initializeSortBuilder() {
    if (!this.options?.sort?.disabled) {
      this.sort = new SortBuilder(
        this.rawQuery,
        this.queryBuilder,
        this.repository
      );
    }
  }
  private initializePaginateBuilder() {
    if (!this.options?.paginate?.disabled) {
      this.paginate = new PaginateBuilder(
        this.rawQuery,
        this.queryBuilder,
        this.options.paginate!
      );
    }
  }
}
