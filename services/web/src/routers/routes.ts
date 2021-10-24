import IRoute from "../model/route";
import Home from "../pages/home/HomePage";
import Error404 from "../pages/Error404";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import CategoryPage from "../pages/category/CategoryPage";
import Example from "../pages/Example";
import MainLayout from "../layout/MainLayout";
import RegisterPage from "../pages/login/RegisterPage";
import BookDetailPage from "../pages/book-detail/BookDetailPage";
import PlaceOrderPage from "../pages/home/placeOrder/PlaceOrderPage";
//const isLogged: boolean = false;

function isLogin() {
  if (localStorage.getItem("user")) return true;
  return false;
}
export const routes: IRoute[] = [
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

export const routeMainLayout: IRoute[] = [
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
    path: "/book-detail",
    name: "Book Detail",
    component: BookDetailPage,
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
    name: "Example",
    component: isLogin() ? ProfilePage : LoginPage,
    exact: false,
  },
  {
    path: "/author",
    name: "Author",
    component: CategoryPage,
    exact: false,
  },
  {
    path: "/book",
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
    path: "*",
    name: "Error",
    component: Error404,
    exact: true,
  },
];
