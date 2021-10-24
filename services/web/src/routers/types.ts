import * as sharedTypes from "../shared/types";

export const ROUTE_HOME = "/";
export const ROUTE_NOT_FOUND = "404";
export const ROUTE_PERMISSION_DENIED = "403";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_BOOK_DETAIL = "/book-detail";
export const ROUTE_PROFILE = "/profile";
export const ROUTE_AUTHOR = "/author";
export const ROUTE_BOOK = "/book";
export const ROUTE_CATEGORY = "/category";
export const ROUTE_BLOGS = "/blogs";
export const ROUTE_OTHERS = "/others";
export const ROUTE_SHOPS = "/shops/:id";
export const ROUTE_CART = "/cart";
export const ROUTE_PLACE_ORDER = "/place-order";

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
  [ROUTE_PROFILE]: {
    permissions: [sharedTypes.ROLE_ADMIN, sharedTypes.ROLE_CUSTOMER],
  },
  [ROUTE_CART]: {
    permissions: [sharedTypes.ROLE_ADMIN, sharedTypes.ROLE_CUSTOMER],
  },
  [ROUTE_PLACE_ORDER]: {
    permissions: [sharedTypes.ROLE_ADMIN, sharedTypes.ROLE_CUSTOMER],
  },
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
