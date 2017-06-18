import React, { Component } from 'react';

import UserProfile from './UserProfile';
import BookCollection from '../BookCollection';

class ProfilePage extends Component {
  render() {
    return (
      <div className="c-profile l-flex__col">
        { /* Pass some stuff down as props */ }
        <UserProfile />
        <BookCollection />
      </div>
    );
  }
}

export default ProfilePage;
