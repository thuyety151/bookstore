import Route from "../model/route";
import Error404 from "../pages/Error404";
import MainLayout from "../layout/MainLayout";
import {
  ROUTE_ATTRIBUTES,
  ROUTE_CATEGORIES,
  ROUTE_COUPONS,
  ROUTE_DASHBOARD,
  ROUTE_ORDERS,
  ROUTE_ORDER_DETAIL,
  ROUTE_PRODUCTS,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_SETTINGS,
  ROUTE_USERS,
} from "./types";
import Example from "../pages/Example";
import OrderPage from "../pages/order/OrderPage";
import OrderDetailPage from "../pages/order/detail/OrderDetail";
import ProductPage from "pages/product/ProductPage";
import ProductDetailPage from "../pages/product/detail/ProductDetail";

export const routePage: Route[] = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    exact: true,
  },
  {
    path: "*",
    name: "Error",
    component: Error404,
    exact: true,
  },
];
export const routes: Route[] = [
  {
    path: ROUTE_DASHBOARD,
    name: "Example",
    component: Example,
    exact: true,
  },
  {
    path: ROUTE_PRODUCTS,
    name: "Book",
    component: ProductPage,
    exact: true,
  },
  {
    path: ROUTE_ATTRIBUTES,
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_CATEGORIES,
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_ORDERS,
    name: "Error",
    component: OrderPage,
    exact: true,
  },
  {
    path: ROUTE_SETTINGS,
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_COUPONS,
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_USERS,
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_ORDER_DETAIL,
    name: "Order",
    component: OrderDetailPage,
    exact: true,
  },
  {
    path: ROUTE_PRODUCT_DETAIL,
    name: "Product",
    component: ProductDetailPage,
    exact: true,
  },
];
