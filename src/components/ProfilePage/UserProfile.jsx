import React, { Component } from "react";
import PropTypes from "prop-types";

import config from "../../../config";

function generateProfilePictureSrc(path) {
  return `${config.BACKEND_API_URL}${path}`;
}

class UserProfile extends Component {
  render() {
    const { username, description, profilePicture } = this.props.user;
    const profilePictureSrc = generateProfilePictureSrc(profilePicture);
    const descriptionText = description === "" ? "No Description" : description;
    return (
      <div className="c-user-profile l-flex__col">
        <div className="l-user-profile__picture">
          <img
            src={profilePictureSrc}
            alt="User Profile"
            className="c-user-profile__picture img-circle"
          />
        </div>
        <div className="c-user-profile__name">
          {username}
        </div>
        <div className="c-user-profile__description">
          {descriptionText}
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object
};

UserProfile.defaultProps = {
  user: {
    username: "",
    description: "",
    profilePicture: generateProfilePictureSrc(config.DEFAULT_USER_IMAGE_PATH)
  }
};

export default UserProfile;
