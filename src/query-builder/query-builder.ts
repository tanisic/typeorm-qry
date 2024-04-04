import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { FilterBuilder } from "../filter-builder/filter-builder";
import { IncludeBuilder } from "../include-builder/include-builder";
import { SortBuilder } from "../sort-builder/sort-builder";
import { QueryBuilderOptions } from "./types";
import { deepMerge } from "../utils";
import { QueryParams } from "../types";

export class QueryBuilder<T extends ObjectLiteral> {
  protected rawQuery: QueryParams;
  protected filter?: FilterBuilder<T>;
  protected include?: IncludeBuilder<T>;
  protected sort?: SortBuilder<T>;
  public readonly queryBuilder: SelectQueryBuilder<T>;
  public readonly repository: Repository<T>;
  protected rootAlias: string;
  protected options: QueryBuilderOptions;

  constructor(
    query: QueryParams,
    repository: Repository<T>,
    options: QueryBuilderOptions = {},
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
  };

  private mergeOptions(options?: QueryBuilderOptions) {
    deepMerge(this.options, this.defaultOptions, options);
  }

  private initializeIncludeBuilder() {
    if (!this.options.include?.disabled) {
      this.include = new IncludeBuilder(
        this.rawQuery,
        this.queryBuilder,
        this.repository,
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
        this.repository,
      );
    }
  }
}
