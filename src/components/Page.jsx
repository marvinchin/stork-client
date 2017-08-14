import React, { Component } from "react";
import { Route } from "react-router-dom";

import Routes from "../Routes";
import AuthRoute from "./AuthRoute";
import Navbar from "./Navbar";
import config from "../../config";

class Page extends Component {
  render() {
    return (
      <div>
        <div>
          {Routes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.navbar ? Navbar : null}
            />
          )}
        </div>
        <div>
          {Routes.map(route => {
            if (route.requireAuth) {
              const ChildComponent = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={() =>
                    <AuthRoute>
                      <ChildComponent />
                    </AuthRoute>}
                />
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Page;
