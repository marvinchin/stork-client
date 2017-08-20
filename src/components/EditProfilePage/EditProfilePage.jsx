import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import { updateUserProfile } from "../../ActionCreators/UserActionCreators.js";

const NO_INPUT = "";

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    const { description, gender } = props.user;
    this.state = {
      profilePicture: null,
      description,
      gender,
      existingPassword: NO_INPUT,
      newPassword: NO_INPUT
    };

    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onProfilePictureChange = this.onProfilePictureChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onExistingPasswordChange = this.onExistingPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onExistingPasswordChange(e) {
    this.setState({ existingPassword: e.target.value });
  }

  onNewPasswordChange(e) {
    this.setState({ newPassword: e.target.value });
  }

  onGenderChange(genderInput) {
    this.setState({ gender: genderInput.value });
  }

  onProfilePictureChange(e) {
    const profilePicture = e.target.files[0];
    this.setState({ profilePicture });
    const reader = new FileReader();
    reader.onload = () => {
      const profilePictureEncoded = reader.result;
    };

    reader.readAsDataURL(profilePicture);
  }

  onEditProfile(e) {
    e.preventDefault();
    const { username } = this.props.user;
    const {
      profilePicture,
      description,
      gender,
      existingPassword,
      newPassword
    } = this.state;
    let password = null;
    if (existingPassword !== NO_INPUT && newPassword !== NO_INPUT) {
      password = {
        old: existingPassword,
        new: newPassword
      };
    }

    const reader = new FileReader();
    reader.onload = () => {
      const profilePictureEncoded = reader.result;
      this.props.dispatch(
        updateUserProfile(
          username,
          description,
          profilePictureEncoded,
          gender,
          password
        )
      );
    };

    reader.readAsDataURL(profilePicture);
  }

  render() {
    const genderOptions = [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" }
    ];

    return (
      <div className="c-edit-profile-page">
        <div className="c-edit-profile-page__title">
          <span>Edit your profile</span>
        </div>
        <form className="c-form l-flex__col">
          <div className="l-form__input-group">
            <label htmlFor="description">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              onChange={this.onProfilePictureChange}
              accept="image/jpeg"
            />
          </div>
          <div className="l-form__input-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows="3"
              id="description"
              className="c-form__input--textarea"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <div className="l-form__input-group">
            <label htmlFor="gender">Gender</label>
            <Select
              value={this.state.gender}
              options={genderOptions}
              onChange={this.onGenderChange}
            />
          </div>
          <div className="l-form__input-group">
            <label htmlFor="existing_password">Existing Password</label>
            <input
              type="password"
              id="existing_password"
              className="c-form__input--text"
              value={this.state.existingPassword}
              onChange={this.onExistingPasswordChange}
            />
          </div>
          <div className="l-form__input-group">
            <label htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              className="c-form__input--text"
              value={this.state.newPassword}
              onChange={this.onNewPasswordChange}
            />
          </div>
          <button className="c-button" onClick={this.onEditProfile}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EditProfilePage);
