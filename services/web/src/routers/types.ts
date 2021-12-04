import * as sharedTypes from "../shared/types";

export const ROUTE_HOME = "/";
export const ROUTE_NOT_FOUND = "404";
export const ROUTE_PERMISSION_DENIED = "403";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_BOOK_DETAIL = "/book-detail/:bookId/:attributeId";
export const ROUTE_PROFILE = "/profile";
export const ROUTE_AUTHOR = "/author";
export const ROUTE_BOOK = "/book";
export const ROUTE_CATEGORY = "/category";
export const ROUTE_BLOGS = "/blogs";
export const ROUTE_OTHERS = "/others";
export const ROUTE_SHOPS = "/shops/:id";
export const ROUTE_CART = "/cart";
export const ROUTE_PLACE_ORDER = "/place-order/:orderCode";
export const ROUTE_CHECK_OUT = "/check-out";
export const ROUTE_BOOKS_FOR_SALE = "/books-for-sale/:predicate";
export const ROUTE_BOOKS_FOR_SALE_CATE = "/books-for-sale-category/:categoryId";

export type RouteConfig = {
  permissions: sharedTypes.AppPermission[];
};

export const PRIVATE_ROUTES = {
  [ROUTE_HOME]: { permissions: [] },
  [ROUTE_LOGIN]: { permissions: [] },
  [ROUTE_REGISTER]: { permissions: [] },
  [ROUTE_REGISTER]: { permissions: [] },
  [ROUTE_NOT_FOUND]: { permissions: [] },
  [ROUTE_BOOK_DETAIL]: { permissions: [] },
  [ROUTE_BOOK]: { permissions: [] },
  [ROUTE_CATEGORY]: { permissions: [] },
  [ROUTE_BLOGS]: { permissions: [] },
  [ROUTE_OTHERS]: { permissions: [] },
  [ROUTE_SHOPS]: { permissions: [] },
  [ROUTE_AUTHOR]: { permissions: [] },
  [ROUTE_CHECK_OUT]: { permissions: [sharedTypes.ROLE_CUSTOMER] },
  [ROUTE_PROFILE]: {
    permissions: [sharedTypes.ROLE_CUSTOMER],
  },
  [ROUTE_CART]: {
    permissions: [sharedTypes.ROLE_CUSTOMER],
  },
  [ROUTE_PLACE_ORDER]: {
    permissions: [sharedTypes.ROLE_CUSTOMER],
  },
  [ROUTE_BOOKS_FOR_SALE]: { permissions: [] },
  [ROUTE_BOOKS_FOR_SALE_CATE]: { permissions: [] },
};

export type AppRoute =
  | keyof typeof PRIVATE_ROUTES
  | typeof ROUTE_LOGIN
  | typeof ROUTE_PERMISSION_DENIED
  | typeof ROUTE_NOT_FOUND;

export type NavigationItem = {
  title: string;
  pathName?: AppRoute;
  key?: string;
  icon?: any;
  permissions?: sharedTypes.AppPermission[];
  subMenus?: NavigationItem[];
};

export enum Predicate {
  Popular = "popular",
  Newest = "newest",
  LowPrice = "low-price",
  HighPrice = "high-price",
  NewRelease = "new-release",
}
