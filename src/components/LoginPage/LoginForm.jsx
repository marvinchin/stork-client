import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../ActionCreators/AuthActionCreators';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    this.props.dispatch(loginUser(null, username, password));
  }

  render() {
    return (
      <form className="c-login-form c-form l-flex__col">
        <div className="c-login-form__title c-logo">
          Stork
        </div>
        <div className="l-login-form__inputs l-flex__col">
          <input
            className="c-form__input--text"
            type="text"
            placeholder="Username"
          />
          <input
            className="c-form__input--text"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="c-login-form__button c-button">
          Log In
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginForm);

/*



      <div className="l-login__login-form">
        <form>
          <div className="l-login__inputs">
            <input
              id="username"
              className="c-login__input form-control"
              type="text"
              placeholder="Username"
              ref={(input) => {
                this.username = input;
              }}
            />
            <input
              id="password"
              className="c-login__input form-control"
              type="password"
              placeholder="Password"
              ref={(input) => {
                this.password = input;
              }}
            />
          </div>
          <button className="c-login__button" onClick={this.onLogin}>Log In</button>
        </form>
      </div>

      */