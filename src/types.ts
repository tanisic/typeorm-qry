import { type Filter } from "./filter-builder/types";
import { type Paginate } from "./paginate-builder";

export type QueryParams = {
  filter?: Filter;
  /**
   * `,` separated string
   *
   * @example
   *
   * `"some.relation,some.relation.other,some.relation.other2"`
   */
  include?: string;
  /**
   * `,` separated string.
   *
   * If attribute name starts with `-` then sort is DESC,
   * else sort is ASC
   *
   * @example
   *
   * `"-name,isActive,nested.relation.property,-nested.email"`
   */
  sort?: string;
  /**
   *
   * @example
   *
   *
   * `
   * {page: 1, perPage: 10}
   * `
   */
  paginate?: Paginate;
};
