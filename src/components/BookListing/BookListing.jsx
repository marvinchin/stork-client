import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BookListing.css';

class BookListing extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.setState(previousState => (
      { expanded: !previousState.expanded }
    ));
  }

  renderDescription() {
    const { expanded } = this.state;
    if (!expanded) {
      return null;
    }
    const { description } = this.props;
    return (
      <div className={styles.description}>
        <p>{ description }</p>
      </div>
    );
  }

  render() {
    const { title, author } = this.props;
    return (
      <div className={styles.BookListing} role="button" tabIndex={0} onClick={this.onClick}>
        <div className={styles.ListingHeader}>
          <div className={styles.infoContainer}>
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.author}>
              by {author}
            </div>
          </div>
          <div className={styles.genreContainer}>
            <div className={styles.genreBubble}>
              F
            </div>
          </div>
        </div>
        { this.renderDescription() }
      </div>
    );
  }
}

BookListing.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string,
};

BookListing.defaultProps = {
  author: 'Not Specified',
  description: 'No Description',
};


export default BookListing;
