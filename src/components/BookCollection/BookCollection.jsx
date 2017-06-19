import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookListing from '../BookListing';

class BookCollection extends Component {
  renderBookListings() {
    const { books, isSelectable } = this.props;
    return books.map(book => (
      <BookListing key={book.id} {...book} isSelectable={isSelectable} />
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
};

BookCollection.defaultProps = {
  books: [
    {
      id: 1,
      title: 'The Three Little Pigs',
      author: 'Big Bad Wolf',
      genre: 'Fiction',
      description: 'The Three Little Pigs meet a Big Bad Wolf',
    },
    {
      id: 2,
      title: 'Little Red Riding Hood',
      author: 'Big Bad Wolf',
      genre: 'Fiction',
    },
  ],
  isSelectable: false,
};

export default BookCollection;
