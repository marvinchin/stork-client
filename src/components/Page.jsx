import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Routes from '../Routes';
import Navbar from './Navbar';

class Page extends Component {
  render() {
    return (
      <div>
        <div>
          { Routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.navbar ? Navbar : null}
            />
          ))}
        </div>
        <div>
          { Routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Page;
