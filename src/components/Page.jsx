import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

class Page extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    );
  }
}

export default Page;
