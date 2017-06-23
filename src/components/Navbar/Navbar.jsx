import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="c-navbar l-flex__col">
        <Link to="/new-book">
          <div className="c-logo">
            Stork
          </div>
        </Link>
      </div>
    );
  }
}

export default Navbar;
