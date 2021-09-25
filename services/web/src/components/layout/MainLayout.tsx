import {  Route, RouteComponentProps, Switch } from "react-router-dom";
import SideBarComponent from "./sidebar/MainSideBar";
import HeaderComponent from "./navbar/Header";
import NavBarComponent from "./navbar/NavBar";
import { routeMainLayout } from "../../routers/routes";
import { useState } from "react";
import FooterComponent from "./footer/MainFooter";
import React from "react"
const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent
        openSideBar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <SideBarComponent
        openSideBar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <Switch>
        {routeMainLayout.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps<any>) => (
                <route.component {...props} {...route.props} />
              )}
            />
            
          );
        })}
      </Switch>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
