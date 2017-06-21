import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../ActionCreators/AuthActionCreators';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
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
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
          <input
            className="c-form__input--text"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>
        <button
          className="c-login-form__button c-button"
          onClick={this.onLogin}
        >
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
