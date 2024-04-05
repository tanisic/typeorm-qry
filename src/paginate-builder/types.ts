export type Paginate =
  | {
      page?: number;
      perPage?: number;
    }
  | {
      page: number;
      perPage: number;
    };
