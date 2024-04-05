import {
  SelectQueryBuilder,
  WhereExpressionBuilder,
  Brackets,
  NotBrackets,
  ObjectLiteral,
} from "typeorm";
import { FilterOperand, Filter, FilterNode } from "./types";
import { QueryParams } from "../types";
import { token } from "../utils/utils";

export class FilterBuilder<T extends ObjectLiteral> {
  private rawQuery: QueryParams;
  private queryBuilder: SelectQueryBuilder<T>;
  private alias: string;
  constructor(query: QueryParams, queryBuilder: SelectQueryBuilder<T>) {
    this.rawQuery = { ...query };
    this.queryBuilder = queryBuilder;

    this.alias = this.queryBuilder.alias.toLowerCase();
    if (this.rawQuery.filter) {
      this.applyFilter(this.queryBuilder, this.rawQuery.filter);
    }
  }
  private operandsMap = {
    [FilterOperand.eq]: "= :EXPRESSION",
    [FilterOperand.regexp]: "~* :EXPRESSION",
    [FilterOperand.gt]: "> :EXPRESSION",
    [FilterOperand.gte]: ">= :EXPRESSION",
    [FilterOperand.in]: "IN (:...EXPRESSION)",
    [FilterOperand.like]: "ILIKE :EXPRESSION",
    [FilterOperand.lt]: "< :EXPRESSION",
    [FilterOperand.lte]: "<= :EXPRESSION",
    [FilterOperand.ne]: "<> :EXPRESSION",
    [FilterOperand.nin]: "NOT IN (:...EXPRESSION)",
    [FilterOperand.some]: "&& :EXPRESSION",
  };

  applyFilter(
    queryBuilder: SelectQueryBuilder<T> | WhereExpressionBuilder,
    filter: Filter | Filter[] | FilterNode | FilterNode[],
    filterRoot: "and" | "or" = "and"
  ) {
    if (Array.isArray(filter)) {
      for (const subFilter of filter) {
        this.applyFilter(queryBuilder, subFilter, filterRoot);
      }
    } else if ("or" in filter) {
      this.applyOrFilter(queryBuilder, filter.or);
    } else if ("and" in filter) {
      this.applyAndFilter(queryBuilder, filter.and);
    } else if ("not" in filter) {
      this.applyNotFilter(queryBuilder, filter.not);
    } else {
      this.applyFilterNode(queryBuilder, filter, filterRoot);
    }
  }

  private applyOrFilter(
    queryBuilder: SelectQueryBuilder<T> | WhereExpressionBuilder,
    filter: Filter | Filter[] | FilterNode | FilterNode[]
  ) {
    queryBuilder.orWhere(
      new Brackets((qb) => {
        if (Array.isArray(filter)) {
          for (const subFilter of filter) {
            this.applyFilter(qb, subFilter, "or");
          }
        } else {
          this.applyFilter(queryBuilder, filter, "or");
        }
      })
    );
  }

  private applyAndFilter(
    queryBuilder: SelectQueryBuilder<T> | WhereExpressionBuilder,
    filter: Filter | Filter[] | FilterNode | FilterNode[]
  ) {
    queryBuilder.andWhere(
      new Brackets((qb) => {
        if (Array.isArray(filter)) {
          for (const subFilter of filter) {
            this.applyFilter(qb, subFilter, "and");
          }
        } else {
          this.applyFilter(queryBuilder, filter, "and");
        }
      })
    );
  }

  private applyNotFilter(
    queryBuilder: SelectQueryBuilder<T> | WhereExpressionBuilder,
    filter: Filter | Filter[] | FilterNode | FilterNode[]
  ) {
    const filters = Array.isArray(filter) ? filter : [filter];
    queryBuilder.andWhere(
      new NotBrackets((qb) => {
        for (const subFilter of filters) {
          this.applyFilter(qb, subFilter, "and");
        }
      })
    );
  }

  private applyFilterNode(
    queryBuilder: SelectQueryBuilder<T> | WhereExpressionBuilder,
    filterNode: FilterNode,
    filterRoot: "and" | "or" = "and"
  ): void {
    // Implement logic to apply FilterNode to the query builder
    // For example:
    const [sqlPart, params] = this.createFilter(
      filterNode.name,
      filterNode.op,
      filterNode.val,
      this.alias
    );
    if (filterRoot === "and") queryBuilder.andWhere(sqlPart, params);
    else queryBuilder.orWhere(sqlPart, params);
  }

  private createFilter(
    name: string,
    op: FilterOperand,
    value: unknown,
    alias?: string
  ) {
    const randName = token();
    if (!(op in this.operandsMap)) throw new Error("Invalid operator.");
    if (name.includes(".")) {
      const split = name.split(".");
      split.unshift(this.alias);
      const property = split.pop();
      alias = split.join("_");
      name = property as string;
    }

    let temp = `${name} ${this.operandsMap[op]}`.replace(
      "EXPRESSION",
      randName
    );

    if (op === FilterOperand.like) {
      value = `%${value}%`;
    }

    if (op === FilterOperand.eq && value === null) {
      temp = `${name} IS NULL`;
    }

    if (op === FilterOperand.ne && value === null) {
      temp = `${name} IS NOT NULL`;
    }

    if (alias) {
      temp = alias + "." + temp;
    }
    return [temp, { [randName]: value }] as const;
  }
}
