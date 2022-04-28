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
export const ROUTE_IMPORT_DATA = "/import-data";
export const ROUTE_USERS = "/users";
export const ROUTE_ORDER_DETAIL = "/orders/:orderId";
export const ROUTE_PRODUCT_DETAIL = "/products/:bookId";
export const ROUTE_PRODUCT_ADD = "/product/add";
export const ROUTE_ORDER_CREATE = "/orders/create";
export const ROUTE_ORDER_EDIT = "/orders/edit/:orderId";
export const ROUTE_REPORT = "/report/:range";
export const ROUTE_EXAMPLE = "/example";

export type RouteConfig = {
  permissions: sharedTypes.AppPermission[];
};

export const PRIVATE_ROUTES = {
  [ROUTE_HOME]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_LOGIN]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_PERMISSION_DENIED]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_LOGIN]: { permissions: [] },
  [ROUTE_DASHBOARD]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_PRODUCTS]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_ATTRIBUTES]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_CATEGORIES]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_ORDERS]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_SETTINGS]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_COUPONS]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_USERS]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_ORDER_DETAIL]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_PRODUCT_DETAIL]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_ORDER_CREATE]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_ORDER_EDIT]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_PRODUCT_ADD]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_REPORT]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_EXAMPLE]: { permissions: [sharedTypes.ROLE_ADMIN] },
  [ROUTE_IMPORT_DATA]: { permissions: [sharedTypes.ROLE_ADMIN] },
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
  // {
  //   title: "Dashboard",
  //   icon: "grid_view",
  //   pathName: ROUTE_DASHBOARD,
  // },
  {
    title: "Report",
    icon: "assessment",
    pathName: ROUTE_REPORT,
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
    title: "Import Data",
    icon: "backup",
    pathName: ROUTE_IMPORT_DATA,
  },
  // {
  //   title: "Users",
  //   icon: "people_outline",
  //   pathName: ROUTE_USERS,
  // },
  // {
  //   title: "Example",
  //   icon: "people_outline",
  //   pathName: ROUTE_EXAMPLE,
  // },
];

export const PUBLIC_URL = {
  PRODUCT: "https://bookworm-client.herokuapp.com/book-detail/",
  CATEGORY: "https://bookworm-client.herokuapp.com/books-for-sale-category/",
};
