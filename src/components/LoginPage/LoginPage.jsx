import React, { Component } from 'react';

import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="c-login container-fluid">
        <div className="l-flex__col l-login__contents">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
