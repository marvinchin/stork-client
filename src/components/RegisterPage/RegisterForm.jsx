import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  resetAuthErrors,
  registerUser
} from "../../ActionCreators/AuthActionCreators";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(resetAuthErrors());
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onRegister(e) {
    e.preventDefault();
    const { email, username, password } = this.state;
    this.props.dispatch(registerUser(null, username, password, email));
  }

  renderErrorMessage() {
    const { authErr } = this.props;
    return (
      <div className="c-register-page__error">
        {authErr !== null ? authErr.message : null}
      </div>
    );
  }

  render() {
    return (
      <form className="c-form l-flex__col">
        <div className="l-form__input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="c-form__input--text"
            placeholder="you@example.com"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="c-form__input--text"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="c-form__input--text"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>
        <button className="c-button" onClick={this.onRegister}>
          Register
        </button>
        {this.renderErrorMessage()}
      </form>
    );
  }
}

RegisterForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authErr: PropTypes.instanceOf(Error)
};

RegisterForm.defaultProps = {
  authErr: null
};

const mapStateToProps = state => ({
  authErr: state.auth.authErr
});

export default connect(mapStateToProps)(RegisterForm);
