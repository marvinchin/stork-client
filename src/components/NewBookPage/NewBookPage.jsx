import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewBookForm from "./NewBookForm";
import { createBook, getGenres } from "../../ActionCreators/BookActionCreators";

class NewBookPage extends Component {
  componentDidMount() {
    this.props.dispatch(getGenres());
  }

  render() {
    const { genres } = this.props;
    const handleCreateSubmit = (title, author, genre, description) => {
      this.props.dispatch(createBook(title, author, genre, description));
    };

    return (
      <div className="c-new-book-page">
        <div className="c-new-book-page__title">
          <span>List your book!</span>
        </div>
        <NewBookForm genres={genres} handleCreateSubmit={handleCreateSubmit} />
      </div>
    );
  }
}

NewBookPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  genres: state.books.genres
});

export default connect(mapStateToProps)(NewBookPage);
