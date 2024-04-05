export type QueryBuilderOptions = {
  filter?: FilterBuilderOptions;
  include?: IncludeBuilderOptions;
  sort?: SortBuilderOptions;
  paginate?: PaginateBuilderOptions;
};

export type FilterBuilderOptions = DisableBuilder & {};

export type IncludeBuilderOptions = DisableBuilder & {};

export type SortBuilderOptions = DisableBuilder & {};

export type PaginateBuilderOptions = DisableBuilder & {
  /**
   *  Maximum data per page, throws error if `perPage` is higher than `maxPerPage`
   */
  maxPerPage?: number;
};

interface DisableBuilder {
  disabled?: boolean;
}
