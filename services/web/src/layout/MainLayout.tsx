import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { routeMainLayout } from "../routers/routes";
import { useState } from "react";
import MainShoppingCart from "../components/shoppingcart/MainShoppingCart";
import HeaderComponent from "../components/layout/navbar/HeaderComponent";
import NavBarComponent from "../components/layout/navbar/NavBar";
import SideBarComponent from "../components/layout/sidebar/MainSideBar";

const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  return (
    <div>
      <HeaderComponent setOpenCart={setOpenCart} />
      <NavBarComponent
        openSideBar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <SideBarComponent
        openSideBar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <MainShoppingCart openCart={openCart} setOpenCart={setOpenCart} />
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
