import React from "react"
import {
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import SideBarComponent from "../components/sidebar/SideBarComponent";
import HeaderComponent from "../components/navbar/HeaderComponent";
import NavBarComponent from "../components/navbar/NavBarComponent";
import { routeMainLayout } from "../routers/routes";
import { useState } from "react";
import MainShoppingCart from "../components/shoppingcart/MainShoppingCart";

const MainLayout: React.FC = () => {
  const [openSidebar,setOpenSidebar] = useState(false)
  const [openCart,setOpenCart] = useState(false)
  return (
    <div>
      <HeaderComponent  setOpenCart={setOpenCart}/>
      <NavBarComponent openSideBar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <SideBarComponent openSideBar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <MainShoppingCart openCart={openCart} setOpenCart={setOpenCart}/>
      <Switch>
        {routeMainLayout.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                render={(props: RouteComponentProps<any>) => (
                  <route.component {...props} {...route.props} />
                )}
              />
            );
          })}
      </Switch>
    </div>
  );
};

export default MainLayout;
