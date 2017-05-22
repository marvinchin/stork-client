import React, { Component } from 'react';

import styles from './LoginPage.css';

class LoginForm extends Component {
  render() {
    return (
      <div className={styles.loginForm}>
        <form>
          <input id="username" className={styles.loginInput} type="text" placeholder="Username" />
          <input id="password" className={styles.loginInput} type="password" placeholder="Password" />
          <button className={styles.loginButton}>Log In</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
