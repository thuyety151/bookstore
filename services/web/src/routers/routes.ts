import IRoute from "../model/route";
import Home from "../pages/home/HomePage";
import Error404 from "../pages/Error404";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import MainLayout from "../layout/MainLayout";
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
    path: "/home",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/profile",
    name: "Example",
    component: isLogged?ProfilePage:LoginPage,
    exact: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: CategoryPage,
    exact: true,
  },
  {
    path: "/blogs/:id",
    name: "Blog",
    component: Example,
    exact: true,
  },
  {
    path: "/others/:id",
    name: "Others",
    component: Example,
    exact: true,
  },
  {
    path: "/shops/:id",
    name: "Shop",
    component: Example,
    exact: true,
  },
];
