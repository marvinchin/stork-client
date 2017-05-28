import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../ActionCreators/AuthActionCreators';

import styles from './LoginPage.css';


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
      <div className={styles.loginForm}>
        <form>
          <input
            id="username"
            className={styles.loginInput}
            type="text"
            placeholder="Username"
            ref={(input) => {
              this.username = input;
            }}
          />
          <input
            id="password"
            className={styles.loginInput}
            type="password"
            placeholder="Password"
            ref={(input) => {
              this.password = input;
            }}
          />
          <button className={styles.loginButton} onClick={this.onLogin}>Log In</button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginForm);
