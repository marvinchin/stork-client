import React, { Component } from "react";
import PropTypes from "prop-types";

import BookListing from "../BookListing";

// TODO: this class has way too many different options
// We should refactor to either extend this class to more specific classes
// Or split it out into different classes entirely
class BookCollection extends Component {
  renderBookListings() {
    const {
      books,
      isSelectable,
      onSelect,
      selected,
      showTradeLink,
      showOwner
    } = this.props;
    return books.map(book =>
      <BookListing
        key={book.id}
        isSelectable={isSelectable}
        onSelect={onSelect}
        selected={selected}
        showTradeLink={showTradeLink}
        showOwner={showOwner}
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
  selected: PropTypes.string,
  showTradeLink: PropTypes.bool,
  showOwner: PropTypes.bool
};

BookCollection.defaultProps = {
  isSelectable: false,
  onSelect: null,
  selected: null,
  showTradeLink: false,
  showOwner: true
};

export default BookCollection;
