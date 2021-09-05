import {
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HeaderComponent from "../components/navbar/HeaderComponent";
import NavBarComponent from "../components/navbar/NavBarComponent";
import { routeMainLayout } from "../routers/routes";

const MainLayout: React.FC = () => {
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
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
