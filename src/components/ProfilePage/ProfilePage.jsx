import React, { Component } from 'react';

import UserProfile from './UserProfile';
import UserCollection from './UserCollection';

import styles from './ProfilePage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className={styles.profileContainer}>
        { /* Pass some stuff down as props */ }
        <UserProfile />
        <UserCollection />
        <div className={styles.collectionFooter}>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
