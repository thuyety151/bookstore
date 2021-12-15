import * as sharedTypes from "../shared/types";

export const ROUTE_HOME = "/";
export const ROUTE_NOT_FOUND = "404";
export const ROUTE_PERMISSION_DENIED = "403";
export const ROUTE_LOGIN = "/login";
export const ROUTE_DASHBOARD = "/dashboard";
export const ROUTE_PRODUCTS = "/products";
export const ROUTE_ATTRIBUTES = "/attributes";
export const ROUTE_CATEGORIES = "/categories";
export const ROUTE_ORDERS = "/orders";
export const ROUTE_SETTINGS = "/settings";
export const ROUTE_COUPONS = "/coupons";
export const ROUTE_USERS = "/users";
export const ROUTE_ORDER_DETAIL = "/orders/:orderId";
export const ROUTE_PRODUCT_DETAIL = "/products/:bookId";
export const ROUTE_PRODUCT_ADD = "/product/add";
export const ROUTE_ORDER_CREATE = "/orders/create";
export const ROUTE_ORDER_EDIT = "/orders/edit/:orderId";
export const ROUTE_REPORT = "/report/:range";

export type RouteConfig = {
  permissions: sharedTypes.AppPermission[];
};

export const PRIVATE_ROUTES = {
  [ROUTE_HOME]: { permissions: [] },
  [ROUTE_LOGIN]: { permissions: [] },
  [ROUTE_PERMISSION_DENIED]: { permissions: [] },
  [ROUTE_LOGIN]: { permissions: [] },
  [ROUTE_DASHBOARD]: { permissions: [] },
  [ROUTE_PRODUCTS]: { permissions: [] },
  [ROUTE_ATTRIBUTES]: { permissions: [] },
  [ROUTE_CATEGORIES]: { permissions: [] },
  [ROUTE_ORDERS]: { permissions: [] },
  [ROUTE_SETTINGS]: { permissions: [] },
  [ROUTE_COUPONS]: { permissions: [] },
  [ROUTE_USERS]: { permissions: [] },
  [ROUTE_ORDER_DETAIL]: { permissions: [] },
  [ROUTE_PRODUCT_DETAIL]: { permissions: [] },
  [ROUTE_ORDER_CREATE]: { permissions: [] },
  [ROUTE_ORDER_EDIT]: { permissions: [] },
  [ROUTE_PRODUCT_ADD]: { permissions: [] },
  [ROUTE_REPORT]: { permissions: [] },
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

export const NAVIGATION_LIST: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: "grid_view",
    pathName: ROUTE_DASHBOARD,
  },
  {
    title: "Products",
    icon: "menu_book",
    pathName: ROUTE_PRODUCTS,
  },
  {
    title: "Categories",
    icon: "category",
    pathName: ROUTE_CATEGORIES,
  },
  {
    title: "Attributes",
    icon: "filter_center_focus",
    pathName: ROUTE_ATTRIBUTES,
  },
  {
    title: "Orders",
    icon: "request_quote",
    pathName: ROUTE_ORDERS,
  },
  {
    title: "Settings",
    icon: "settings",
    pathName: ROUTE_SETTINGS,
  },
  {
    title: "Coupons",
    icon: "confirmation_number",
    pathName: ROUTE_COUPONS,
  },
  {
    title: "Report",
    icon: "assessment",
    pathName: ROUTE_REPORT,
  },
  {
    title: "Users",
    icon: "people_outline",
    pathName: ROUTE_USERS,
  },
];
