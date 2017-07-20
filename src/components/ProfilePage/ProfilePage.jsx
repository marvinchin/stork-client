import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserProfile from "./UserProfile";
import BookCollection from "../BookCollection";
import { getUserProfile } from "../../ActionCreators/UserActionCreators";

class ProfilePage extends Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.dispatch(getUserProfile(username));
  }

  render() {
    const { user } = this.props;
    if (user) {
      const userBooks = user.books;
      return (
        <div className="c-profile l-flex__col">
          <UserProfile user={user} />
          <BookCollection books={userBooks} />
        </div>
      );
    }
    return null;
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object
};

ProfilePage.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps)(ProfilePage);
