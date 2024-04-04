export type QueryBuilderOptions = {
  filter?: FilterBuilderOptions;
  include?: IncludeBuilderOptions;
  sort?: SortBuilderOptions;
};

export type FilterBuilderOptions = DisableBuilder & {};

export type IncludeBuilderOptions = DisableBuilder & {};

export type SortBuilderOptions = DisableBuilder & {};

interface DisableBuilder {
  disabled?: boolean;
}
