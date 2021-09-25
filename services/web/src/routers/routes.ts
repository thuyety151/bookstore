import IRoute from "../model/route";
import Home from "../pages/home/HomePage";
import Error404 from "../pages/Error404";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import CategoryPage from "../pages/category/CategoryPage";
import Example from "../pages/Example";

const isLogged: boolean = false;

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
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/profile",
    name: "Example",
    component: isLogged?ProfilePage:LoginPage,
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
    path: "*",
    name: "Error",
    component: Error404,
    exact: true,
  },
];
