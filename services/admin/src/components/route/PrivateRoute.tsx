import { reportOptions } from "pages/report/ReportPage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { getReports } from "redux/actions/report/getActions";
import { RootStore } from "redux/store";
import {
  PRIVATE_ROUTES,
  RouteConfig,
  ROUTE_LOGIN,
  ROUTE_NOT_FOUND,
  ROUTE_PERMISSION_DENIED,
} from "../../routers/types";

const PrivateRoute: React.FC<{
  component: any;
  path: string;
  exact: boolean;
}> = (props) => {
  const routeConfig: RouteConfig = (PRIVATE_ROUTES as any)[props.path];
  const user = JSON.parse(localStorage.getItem("user")!);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootStore) => state.reports);

  useEffect(() => {
    if (!data.length) {
      dispatch(getReports(reportOptions[2].value));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const condition = () => {
    if (!routeConfig) {
      return { redirect: true, path: ROUTE_NOT_FOUND };
    }
    const role = user?.role;
    if (
      !routeConfig.permissions?.length ||
      (role && routeConfig.permissions.includes(role))
    ) {
      return { redirect: false, path: props.path }; // publish path || isLogin = true
    } else if (routeConfig.permissions.length) {
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
