import React, { Component } from 'react';

import styles from './ProfilePage.css';

class UserProfile extends Component {
  render() {
    return (
      <div className={styles.userProfileContainer}>
        <div className={styles.profilePictureContainer}>
          <div className={styles.profilePicture} >
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.usernameContainer}>
            <span className={styles.username}>
              fooyj12
            </span>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              I like big butts and I cannot lie.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
