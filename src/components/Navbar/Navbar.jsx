import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  renderDropdown() {
    const { user } = this.props;
    let dropdownItems;
    if (user !== null) {
      const profileUrl = `/user/${user.username}`;
      dropdownItems = (
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <Link to={profileUrl}>Profile</Link>
            <Link to="/index">Logout</Link>
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
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          <span className="glyphicon glyphicon-menu-hamburger" />
        </a>
        {dropdownItems}
      </div>
    );
  }

  render() {
    return (
      <div className="c-navbar l-flex__col">
        <div className="l-navbar">
          <Link className="c-navbar__logo" to="/index">
            <div className="c-logo">
              Stork
            </div>
          </Link>
          {this.renderDropdown()}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
};

Navbar.defaultProps = {
  user: null,
};

const mapStateToProps = state => (
  {
    user: state.auth.user,
  }
);

export default connect(mapStateToProps)(Navbar);
