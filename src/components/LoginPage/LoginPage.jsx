import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

import styles from './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className={styles.loginContainer}>
        <Link to="/">
          <div className={styles.loginTitle}>
            Stork
          </div>
        </Link>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
