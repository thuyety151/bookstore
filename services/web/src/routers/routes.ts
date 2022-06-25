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

import {
  ROUTE_AUTHOR,
  ROUTE_AUTHOR_DETAIL,
  ROUTE_BOOK,
  ROUTE_BOOKS_FOR_SALE,
  ROUTE_BOOKS_FOR_SALE_AUTHOR,
  ROUTE_BOOKS_FOR_SALE_CATE,
  ROUTE_BOOK_DETAIL,
  ROUTE_BOOK_DETAIL_ADMIN,
  ROUTE_CART,
  ROUTE_CATEGORY,
  ROUTE_CHECK_OUT,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PLACE_ORDER,
  ROUTE_PROFILE_PREDICATE,
  ROUTE_REGISTER,
  ROUTE_WISHLIST,
} from "./types";
import WishlistPage from "../pages/wishlist/WishlistPage";
import ListAuthorPage from "../pages/author/ListAuthorPage";
import AuthorDetail from "../pages/author/AuthorDetail";

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
    path: ROUTE_LOGIN,
    name: "Login",
    component: LoginPage,
    exact: false,
  },
  {
    path: ROUTE_REGISTER,
    name: "Register",
    component: RegisterPage,
    exact: false,
  },
  {
    path: ROUTE_BOOK_DETAIL,
    name: "Book Detail",
    component: BookDetailPage,
    exact: true,
  },
  {
    path: ROUTE_BOOK_DETAIL_ADMIN,
    name: "Book Detail",
    component: BookDetailPage,
    exact: true,
  },
  {
    path: ROUTE_BOOKS_FOR_SALE,
    name: "Books For Sale",
    component: BooksForSalePage,
    exact: false,
  },
  {
    path: ROUTE_BOOKS_FOR_SALE_CATE,
    name: "Books For Sale",
    component: BooksForSalePage,
    exact: false,
  },
  {
    path: ROUTE_BOOKS_FOR_SALE_AUTHOR,
    name: "Books For Sale",
    component: BooksForSalePage,
    exact: false,
  },
  {
    path: ROUTE_CHECK_OUT,
    name: "Check out",
    component: CheckoutPage,
    exact: false,
  },
  {
    path: ROUTE_HOME,
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: ROUTE_PROFILE_PREDICATE,
    name: "My Account",
    component: ProfilePage,
    exact: true,
  },
  {
    path: ROUTE_AUTHOR,
    name: "Author",
    component: ListAuthorPage,
    exact: false,
  },
  {
    path: ROUTE_AUTHOR_DETAIL,
    name: "detail",
    component: AuthorDetail,
    exact: true,
  },
  {
    path: ROUTE_BOOK,
    name: "Book",
    component: CategoryPage,
    exact: false,
  },
  {
    path: ROUTE_CATEGORY,
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
    path: ROUTE_PLACE_ORDER,
    name: "Place Order",
    component: PlaceOrderPage,
    exact: false,
  },
  {
    path: ROUTE_CART,
    name: "Cart",
    component: ShoppingCartPage,
    exact: false,
  },
  {
    path: ROUTE_WISHLIST,
    name: "Cart",
    component: WishlistPage,
    exact: false,
  },
  {
    path: "*",
    name: "Error",
    component: Error404,
    exact: true,
  },
];
