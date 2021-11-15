import Route from "../model/route";
import Home from "../pages/home/HomePage";
import Error404 from "../pages/Error404";
import ProfilePage from "../pages/profile/AccountPage";
import LoginPage from "../pages/login/LoginPage";
import CategoryPage from "../pages/category/CategoryPage";
import Example from "../pages/Example";
import MainLayout from "../layout/MainLayout";
import ShoppingCartPage from "../pages/shoppingcart/ShoppingCartPage";
import RegisterPage from "../pages/login/RegisterPage";
import BookDetailPage from "../pages/book-detail/BookDetailPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";

import PlaceOrderPage from "../pages/home/placeOrder/PlaceOrderPage";
import BooksForSalePage from "../pages/books-for-sale/BooksForSale";
import { ROUTE_AUTHOR, ROUTE_BOOK, ROUTE_BOOK_DETAIL } from "./types";
//const isLogged: boolean = false;

// function isLogin() {
//   if (localStorage.getItem("user")) return true;
//   return false;
// }
export const routes: Route[] = [
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

export const routeMainLayout: Route[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    exact: false,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    exact: false,
  },
  {
    path: ROUTE_BOOK_DETAIL,
    name: "Book Detail",
    component: BookDetailPage,
    exact: false,
  },
  {
    path: "/books-for-sale",
    name: "Books For Sale",
    component: BooksForSalePage,
    exact: false,
  },
  {
    path: "/check-out",
    name: "Check out",
    component: CheckoutPage,
    exact: false,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/profile",
    name: "My Account",
    component: ProfilePage,
    exact: false,
  },
  {
    path: ROUTE_AUTHOR,
    name: "Author",
    component: CategoryPage,
    exact: false,
  },
  {
    path: ROUTE_BOOK,
    name: "Book",
    component: CategoryPage,
    exact: false,
  },
  {
    path: "/category",
    name: "Category",
    component: CategoryPage,
    exact: false,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: CategoryPage,
    exact: false,
  },
  {
    path: "/blogs/:id",
    name: "Blog",
    component: Example,
    exact: false,
  },
  {
    path: "/others/:id",
    name: "Others",
    component: Example,
    exact: false,
  },
  {
    path: "/shops/:id",
    name: "Shop",
    component: Example,
    exact: false,
  },
  {
    path: "/place-order",
    name: "Place Order",
    component: PlaceOrderPage,
    exact: false,
  },
  {
    path: "/cart",
    name: "Cart",
    component: ShoppingCartPage,
    exact: false,
  },
  {
    path: "*",
    name: "Error",
    component: Error404,
    exact: true,
  },
];
