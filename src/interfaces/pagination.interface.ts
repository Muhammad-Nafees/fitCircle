export interface IPagination {
  currentPage: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  perPage: number | null;
  prevPage: number | null;
  totalItems: number | null;
  totalPages: number | null;
}
