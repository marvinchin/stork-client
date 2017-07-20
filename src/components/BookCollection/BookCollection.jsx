import React, { Component } from "react";
import PropTypes from "prop-types";

import BookListing from "../BookListing";

class BookCollection extends Component {
  renderBookListings() {
    const { books, isSelectable, onSelect, showTradeLink } = this.props;
    return books.map(book =>
      <BookListing
        key={book.id}
        isSelectable={isSelectable}
        onSelect={onSelect}
        showTradeLink={showTradeLink}
        {...book}
      />
    );
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
  onSelect: PropTypes.func,
  showTradeLink: PropTypes.bool
};

BookCollection.defaultProps = {
  isSelectable: false,
  onSelect: null,
  showTradeLink: false
};

export default BookCollection;
