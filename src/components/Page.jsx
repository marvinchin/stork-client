import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Routes from "../Routes";
import AuthRoute from "./AuthRoute";
import Navbar from "./Navbar";
import { authenticateUser } from "../ActionCreators/AuthActionCreators";

class Page extends Component {
  componentDidMount() {
    this.props.dispatch(authenticateUser());
  }

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

Page.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect()(Page));
