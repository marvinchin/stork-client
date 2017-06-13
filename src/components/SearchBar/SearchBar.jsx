import React, { Component } from 'react';

import styles from './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className={styles.searchContainer}>
        <form>
          <div className={styles.formRow}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Stork It!"
            />
            <select
              className={styles.searchSelect}
            >
              <option value="Title">Title</option>
              <option value="Author">Author</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <div className={styles.selectGroup}>
              <label htmlFor="genreSelect">Genre</label>
              <select
                className={styles.genreSelect}
                id="genreSelect"
              >
                <option value="No Restriction">No Restriction</option>
                <option value="Fiction">Fiction</option>
              </select>
            </div>
            <div className={styles.selectGroup}>
              <label htmlFor="proximitySelect">Proximity</label>
              <select
                className={styles.proximitySelect}
                id="proximitySelect"
              >
                <option value="No Restriction">No Restriction</option>
                <option value="5km">5km</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <button
              className={styles.searchButton}
            >
              Search!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
