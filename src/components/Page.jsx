import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';

class Page extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/user" component={ProfilePage} />
      </div>
    );
  }
}

export default Page;
