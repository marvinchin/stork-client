import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerUser } from '../../ActionCreators/AuthActionCreators';

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
      <form className="c-form l-flex__col">
        <div className="l-form__input-group">
          <label htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="c-form__input--text"
            placeholder="you@example.com"
            ref={(input) => {
              this.email = input;
            }}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="c-form__input--text"
            placeholder="Your username"
            ref={(input) => {
              this.username = input;
            }}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="c-form__input--text"
            placeholder="Your password"
            ref={(input) => {
              this.password = input;
            }}
          />
        </div>
        <button
          className="c-button"
          onClick={this.onRegister}
        >
          Register
        </button>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(RegisterForm);
