// export const paginationValue = {
//   pageSize: 20,
// };
export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalCount: number;
};
export const rowsPerPageOptions = [5, 10, 15, 20, 25, 50];

export const paginationValue: Pagination = {
  pageSize: rowsPerPageOptions[0],
  pageIndex: 1,
  totalCount: 0,
  totalPage: 0,
};
