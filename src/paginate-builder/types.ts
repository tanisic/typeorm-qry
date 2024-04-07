export type Paginate =
  | {
      page?: number | string;
      perPage?: number | string;
    }
  | {
      page: number | string;
      perPage: number | string;
    };
