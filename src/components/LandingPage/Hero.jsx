import React, { Component } from "react";
import { Link } from "react-router-dom";

class Hero extends Component {
  render() {
    return (
      <div className="c-hero l-flex__col">
        <div className="l-flex__col l-hero__contents">
          <div className="c-hero__title c-logo">Stork</div>
          <div className="c-hero__tagline">Make your books great again.</div>
          <div className="l-hero__buttons">
            <Link to="/login">
              <button className="c-hero__button c-button">Log In</button>
            </Link>
            <Link to="/register">
              <button className="c-hero__button c-button">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
