import React, { Component } from "react";

import RegisterForm from "./RegisterForm";

class RegisterPage extends Component {
  render() {
    return (
      <div className="c-register-page">
        <div className="c-register-page__title">
          <span>Sign up on</span>
          &nbsp;
          <span className="c-logo">Stork</span>
        </div>
        <RegisterForm />
      </div>
    );
  }
}

export default RegisterPage;
