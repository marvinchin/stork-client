import React, { Component } from 'react';
import BookCollection from '../BookCollection';
import SearchBar from '../SearchBar';

import styles from './HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.homeContainer}>
        <SearchBar />
        <div className={styles.bookCollection}>
          <BookCollection />
        </div>
      </div>
    );
  }
}

export default HomePage;
