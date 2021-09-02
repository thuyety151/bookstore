import IRoute from "../model/route";
import Home from "../pages/home/HomePage"
import Error404 from "../pages/Error404"
import ProfilePage from "../pages/profile/ProfilePage"
import LoginPage from "../pages/login/LoginPage"

const isLogged:boolean=false

const routes: IRoute[] = [
  {
    path: "/",
    name:"Home",
    component: Home, 
    exact:true
  },
  {
    path: "/example",
    name:"Example",
    component: Error404,
    exact:true
  },
  {
    path: "/profile",
    name:"Profile",
    component: isLogged?ProfilePage:LoginPage,
    exact:true
  },
  {
    path: "*",
    name:"Error",
    component: Error404,
    exact:true
  },
];
export default routes;

