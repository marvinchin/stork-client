import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authenticateUser } from "../../ActionCreators/AuthActionCreators";

class AuthRoute extends Component {
  componentDidMount() {
    this.props.dispatch(authenticateUser());
  }

  render() {
    const { children, user } = this.props;
    if (user) {
      return (
        <div>
          {React.cloneElement(children, this.props)}
        </div>
      );
    }
    return null;
  }
}

AuthRoute.propTypes = {
  children: PropTypes.any.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

AuthRoute.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(AuthRoute));
