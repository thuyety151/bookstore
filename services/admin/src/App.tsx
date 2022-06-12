import React, { useEffect, useState } from "react";
import "./App.scss";
import { routePage } from "./routers/routes";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";
import { getTokenForNoti, onMessageListener } from "boot/firebase";
import Notification from "layout/Notification";

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div>
      <Provider store={store}>
        <Notification />

        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <Switch>
              {routePage.map((route, index) => {
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
