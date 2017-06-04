import React, { Component } from 'react';

import BookListing from '../BookListing';

import styles from './ProfilePage.css';

class UserCollection extends Component {
  render() {
    const BookOne = {
      title: 'The Three Little Pigs',
      author: 'Big Bad Wolf',
      genre: 'Fiction',
      description: 'The Three Little Pigs meet a Big Bad Wolf',
    };

    const BookTwo = {
      title: 'Little Red Riding Hood',
      author: 'Big Bad Wolf',
      gemre: 'Fiction',
    };

    return (
      <div className={styles.userCollections}>
        <div className={styles.listings}>
          <BookListing {...BookOne} />
          <BookListing {...BookTwo} />
        </div>
      </div>
    );
  }
}

export default UserCollection;
