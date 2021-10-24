import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import {
  PRIVATE_ROUTES,
  RouteConfig,
  ROUTE_LOGIN,
  ROUTE_NOT_FOUND,
  ROUTE_PERMISSION_DENIED,
} from "../../routers/types";
// import { AppPermission } from "../../shared/types";

const PrivateRoute: React.FC<{
  component: any;
  path: string;
  exact: boolean;
}> = (props) => {
  const routeConfig: RouteConfig = (PRIVATE_ROUTES as any)[props.path];
  // const user = useSelector((state: RootStore) => state.authenticate.user);
  // const isLogin = useSelector((state: RootStore) => state.authenticate.isLogin);
  const isLogin = false;

  const condition = () => {
    if (!routeConfig) {
      return { redirect: true, path: ROUTE_NOT_FOUND };
    }
    // const role = store.state.global.account?.type as AppPermission;
    const role = "admin";
    if (
      !routeConfig.permissions?.length ||
      (role && routeConfig.permissions.includes(role))
    ) {
      if (isLogin || routeConfig.permissions?.length === 0) {
        return { redirect: false, path: props.path }; // publish path
      }
      return { redirect: true, path: ROUTE_LOGIN };
    }
    return { redirect: true, path: ROUTE_PERMISSION_DENIED };
  };

  const { redirect, path } = condition();
  return (
    <Route
      path={props.path}
      exact={props.exact}
      render={(propsRender: RouteComponentProps<any>) => {
        return redirect ? (
          <Redirect push to={{ pathname: path }} />
        ) : (
          <props.component {...propsRender} />
        );
      }}
    />
  );
};
export default PrivateRoute;
