import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';

import styles from './RegisterPage.css';

class RegisterPage extends Component {
  render() {
    return (
      <div className={styles.registerContainer}>
        <Link to="/">
          <div className={styles.loginTitle}>
            Stork
          </div>
        </Link>
        <RegisterForm />
      </div>
    );
  }
}

export default RegisterPage;
