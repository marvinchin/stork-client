import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookListing from '../BookListing';

class BookCollection extends Component {
  renderBookListings() {
    const { books, isSelectable, showTradeLink } = this.props;
    return books.map(book => (
      <BookListing
        key={book.id}
        isSelectable={isSelectable}
        showTradeLink={showTradeLink}
        {...book}
      />
    ));
  }

  render() {
    return (
      <div className="l-flex__col">
        {this.renderBookListings()}
      </div>
    );
  }
}

BookCollection.propTypes = {
  books: PropTypes.array.isRequired,
  isSelectable: PropTypes.bool,
  showTradeLink: PropTypes.bool,
};

BookCollection.defaultProps = {
  isSelectable: false,
  showTradeLink: false,
};

export default BookCollection;
