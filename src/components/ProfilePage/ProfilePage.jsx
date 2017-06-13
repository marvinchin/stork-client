import React, { Component } from 'react';

import UserProfile from './UserProfile';
import BookCollection from '../BookCollection';

import styles from './ProfilePage.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className={styles.profileContainer}>
        { /* Pass some stuff down as props */ }
        <UserProfile />
        <div className={styles.bookCollection} >
          <BookCollection />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
