import Route from "../model/route";
import Error404 from "../pages/Error404";
import MainLayout from "../layout/MainLayout";
import {
  ROUTE_ATTRIBUTES,
  ROUTE_CATEGORIES,
  ROUTE_COUPONS,
  ROUTE_DASHBOARD,
  ROUTE_ORDERS,
  ROUTE_ORDER_CREATE,
  ROUTE_ORDER_DETAIL,
  ROUTE_ORDER_EDIT,
  ROUTE_PRODUCTS,
  ROUTE_SETTINGS,
  ROUTE_USERS,
} from "./types";
import Example from "../pages/Example";
import OrderPage from "../pages/order/OrderPage";
import OrderEditPage from "../pages/order/detail/OrderEdit";
import AttributePage from "pages/attribute/AttributePage";
import Validation from "pages/Validation";

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
    name: "Error",
    component: Error404,
    exact: true,
  },
  {
    path: ROUTE_ATTRIBUTES,
    name: "Error",
    component: AttributePage,
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
    component: Validation,
    exact: true,
  },
  {
    path: ROUTE_ORDER_DETAIL,
    name: "Order",
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
  },
];
