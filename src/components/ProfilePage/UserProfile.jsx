import React, { Component } from 'react';

// for testing
const profilePicture = require('../../public/images/yongjie.jpg');

class UserProfile extends Component {
  render() {
    return (
      <div className="c-user-profile l-flex__col">
        <div className="l-user-profile__picture">
          <img
            src={profilePicture}
            alt="User Profile"
            className="c-user-profile__picture img-circle"
          />
        </div>
        <div className="c-user-profile__name">
          fooyj12
        </div>
        <div className="c-user-profile__description">
          I like big butts and I cannot lie. Once upon a time there were three little pigs.
        </div>
      </div>
    );
  }
}

export default UserProfile;
