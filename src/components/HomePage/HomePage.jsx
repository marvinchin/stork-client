import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar';
import BookCollection from '../BookCollection';
import { getIndexBooks } from '../../ActionCreators/BookActionCreators';

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getIndexBooks());
  }

  render() {
    const { indexBooks } = this.props;
    const indexBooksFixGenre = indexBooks.map(book => (
      Object.assign({}, book, { genre: book.genre[0] })
    ));
    return (
      <div className="c-home">
        <SearchBar />
        <BookCollection books={indexBooksFixGenre} />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  indexBooks: PropTypes.array.isRequired,
};

const mapStateToProps = state => (
  {
    indexBooks: state.books.indexBooks,
  }
);

export default connect(mapStateToProps)(HomePage);
