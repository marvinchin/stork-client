import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../ActionCreators/AuthActionCreators";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout(e) {
    e.preventDefault();
    this.props.dispatch(logoutUser());
  }

  renderDropdown() {
    const { user } = this.props;
    let dropdownItems;
    if (user !== null) {
      const profileUrl = `/user/${user.username}`;
      dropdownItems = (
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <Link to={profileUrl}>Profile</Link>
            <Link to="/profile">Edit Profile</Link>
            <Link to="/inbox">Inbox</Link>
            <Link to="#" onClick={this.onClickLogout}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      dropdownItems = (
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="c-navbar__dropdown">
        <button className="dropdown-toggle" data-toggle="dropdown">
          <span className="glyphicon glyphicon-menu-hamburger" />
        </button>
        {dropdownItems}
      </div>
    );
  }

  render() {
    return (
      <div className="c-navbar l-flex__col">
        <div className="l-navbar">
          <Link to="/index">
            <div className="c-logo c-navbar__logo">Stork</div>
          </Link>
          {this.renderDropdown()}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
};

Navbar.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
