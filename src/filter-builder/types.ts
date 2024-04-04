export type FilterNode = { name: string; op: FilterOperand; val: unknown };

export type Filter =
  | { or: FilterNode | FilterNode[] | Filter | Filter[] }
  | { or: FilterNode | FilterNode[] | Filter | Filter[] }[]
  | { and: FilterNode | FilterNode[] | Filter | Filter[] }
  | { and: FilterNode | FilterNode[] | Filter | Filter[] }[]
  | { not: FilterNode | FilterNode[] | Filter | Filter[] }
  | { not: FilterNode | FilterNode[] | Filter | Filter[] }[]
  | FilterNode[];

export enum FilterOperand {
  eq = "eq",
  gt = "gt",
  gte = "gte",
  in = "in",
  like = "like",
  lt = "lt",
  lte = "lte",
  ne = "ne",
  nin = "nin",
  regexp = "regexp",
  some = "some",
}
