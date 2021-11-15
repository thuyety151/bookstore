/** @format */

import React from "react";
import "./App.css";
import { routes } from "./routers/routes";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {routes.map((route, index) => {
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
        </BrowserRouter>
      </Provider>
    </div>
  );
};
export default App;
