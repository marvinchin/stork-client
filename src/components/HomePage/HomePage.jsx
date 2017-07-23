import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SearchBar from "../SearchBar";
import BookCollection from "../BookCollection";
import {
  getIndexBooks,
  searchBooks
} from "../../ActionCreators/BookActionCreators";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getIndexBooks());
  }

  render() {
    const { indexBooks } = this.props;

    const onSearch = (query, searchBy, genre) => {
      this.props.dispatch(searchBooks(query, searchBy, genre));
    };
    return (
      <div className="c-home">
        <SearchBar onSearch={onSearch} />
        <BookCollection books={indexBooks} showTradeLink />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  indexBooks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  indexBooks: state.books.indexBooks
});

export default connect(mapStateToProps)(HomePage);
