import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerUser } from '../../ActionCreators/AuthActionCreators';

import styles from './RegisterPage.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister(e) {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    const email = this.email.value;
    this.props.dispatch(registerUser(null, username, password, email));
  }

  render() {
    return (
      <div className={styles.registerForm}>
        <form>
          <input
            id="username"
            className={styles.registerInput}
            type="text"
            placeholder="Username"
            ref={(input) => {
              this.username = input;
            }}
          />
          <input
            id="password"
            className={styles.registerInput}
            type="password"
            placeholder="Password"
            ref={(input) => {
              this.password = input;
            }}
          />
          <input
            id="email"
            className={styles.registerInput}
            type="text"
            placeholder="You@Email.com"
            ref={(input) => {
              this.email = input;
            }}
          />
          <button
            className={styles.registerButton}
            onClick={this.onRegister}
          >
            Log In
          </button>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(RegisterForm);
