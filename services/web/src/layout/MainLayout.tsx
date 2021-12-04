import React from "react";
import { Switch } from "react-router-dom";
import { routeMainLayout } from "../routers/routes";
import { useState } from "react";
import MainShoppingCart from "../components/shoppingcart/MainShoppingCart";
import HeaderComponent from "../components/layout/navbar/HeaderComponent";
import NavBarComponent from "../components/layout/navbar/NavBar";
import SideBarComponent from "../components/layout/sidebar/MainSideBar";
import PrivateRoute from "../components/route/PrivateRoute";
import FooterComponent from "../components/layout/footer/MainFooter";
import { AppBar } from "@material-ui/core";

const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <div style={{ marginTop: "8rem" }}>
      <AppBar position="fixed" color="inherit" elevation={0}>
        <HeaderComponent setOpenCart={setOpenCart} />
        <NavBarComponent
          openSideBar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </AppBar>
      <SideBarComponent
        openSideBar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <MainShoppingCart openCart={openCart} setOpenCart={setOpenCart} />
      {/* <ScrollToTop> */}
        <Switch>
          {routeMainLayout.map((route, index) => {
            return (
              <PrivateRoute
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      {/* </ScrollToTop> */}
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
