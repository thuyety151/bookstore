import Route from "../model/route";
import Error404 from "../pages/Error404";
import MainLayout from "../layout/MainLayout";
import {
  ROUTE_ATTRIBUTES,
  ROUTE_AUTHORS,
  ROUTE_CATEGORIES,
  ROUTE_COUPONS,
  ROUTE_DASHBOARD,
  ROUTE_EXAMPLE,
  ROUTE_IMPORT_DATA,
  ROUTE_LOGIN,
  ROUTE_ORDERS,
  ROUTE_ORDER_CREATE,
  ROUTE_ORDER_DETAIL,
  ROUTE_ORDER_EDIT,
  ROUTE_PRODUCTS,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_REPORT,
  ROUTE_SETTINGS,
  ROUTE_USERS,
} from "./types";
import Example from "../pages/Example";
import OrderPage from "../pages/order/OrderPage";
import ProductPage from "pages/product/ProductPage";
import ProductDetailPage from "../pages/product/detail/ProductDetail";
import OrderEditPage from "../pages/order/detail/OrderEdit";
import AttributePage from "pages/attribute/AttributePage";
import Validation from "pages/Validation";
import CategoryPage from "pages/category/CategoryPage";
import SettingsPage from "pages/settings/SettingsPage";
import CouponsPage from "pages/coupon/CouponPage";
import ReportPage from "pages/report/ReportPage";
import LoginPage from "pages/login/LoginPage";
import Dashboard from "pages/dashboard/Dashboard";
import ImportData from "pages/import-data/ImportData";
import AuthorPage from "pages/author/AuthorPage";

export const routePage: Route[] = [
  {
    path: ROUTE_LOGIN,
    name: "Login",
    component: LoginPage,
    exact: false,
  },
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    exact: false,
  },

  {
    path: "*",
    name: "Error",
    component: Error404,
    exact: false,
  },
];
export const routes: Route[] = [
  {
    path: ROUTE_DASHBOARD,
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: ROUTE_PRODUCTS,
    name: "Products",
    component: ProductPage,
    exact: true,
  },
  {
    path: ROUTE_ATTRIBUTES,
    name: "Attributes",
    component: AttributePage,
    exact: true,
  },
  {
    path: ROUTE_CATEGORIES,
    name: "Categories",
    component: CategoryPage,
    exact: true,
  },
  {
    path: ROUTE_ORDERS,
    name: "Orders",
    component: OrderPage,
    exact: true,
  },
  {
    path: ROUTE_SETTINGS,
    name: "Settings",
    component: SettingsPage,
    exact: true,
  },
  {
    path: ROUTE_COUPONS,
    name: "Coupons",
    component: CouponsPage,
    exact: true,
  },
  {
    path: ROUTE_REPORT,
    name: "Dashboard",
    component: ReportPage,
    exact: true,
  },
  {
    path: ROUTE_USERS,
    name: "Error",
    component: Validation,
    exact: true,
  },
  {
    path: ROUTE_ORDER_DETAIL,
    name: "Order Detail",
    component: OrderEditPage,
    exact: true,
  },
  {
    path: ROUTE_ORDER_CREATE,
    name: "Create Order",
    component: OrderEditPage,
    exact: true,
  },
  {
    path: ROUTE_ORDER_EDIT,
    name: "Edit Order",
    component: OrderEditPage,
    exact: true,
    parents: [ROUTE_ORDERS],
  },
  {
    path: ROUTE_PRODUCT_DETAIL,
    name: "Product",
    component: ProductDetailPage,
    exact: true,
  },
  {
    path: ROUTE_PRODUCT_ADD,
    name: "Add Product",
    component: ProductDetailPage,
    exact: true,
    parents: [ROUTE_PRODUCTS],
  },
  {
    path: ROUTE_AUTHORS,
    name: "Authors",
    component: AuthorPage,
    exact: true,
  },
  {
    path: ROUTE_EXAMPLE,
    name: "Example",
    component: Example,
    exact: true,
  },
  {
    path: ROUTE_IMPORT_DATA,
    name: "Import Data",
    component: ImportData,
    exact: true,
  },
];
