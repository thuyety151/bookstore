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
import { SnackbarProvider } from "notistack";

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3} preventDuplicate>
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
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
export default App;
