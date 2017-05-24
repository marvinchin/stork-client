import React, { Component } from 'react';

import styles from './LoginPage.css';
import { loginUser } from '../../apis';


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    loginUser(username, password).then((res) => {
      console.log(res.status);
      // should be using async saga here
    });
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

export default LoginForm;
