import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import { createBook } from '../../ActionCreators/BookActionCreators';

class NewBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      genre: 'None',
      description: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onGenreUpdate = this.onGenreUpdate.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCreateBook = this.onCreateBook.bind(this);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  onGenreUpdate(genre) {
    this.setState({
      genre,
    });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onCreateBook(e) {
    e.preventDefault();
    const { title, author, genre, description } = this.state;
    this.props.dispatch(createBook(title, author, genre, description));
  }

  render() {
    const genreOptions = [
      { value: 'Sci-Fi', label: 'Sci-Fi' },
      { value: 'Fiction', label: 'Fiction' },
    ];

    return (
      <form className="c-form l-flex__col c-new-book-form">
        <div className="l-form__input-group">
          <label htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="c-new-book-form__input c-form__input--text"
            placeholder="The Da Vinci Code"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="c-new-book-form__input c-form__input--text"
            placeholder="Dan Brown"
            value={this.state.author}
            onChange={this.onAuthorChange}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="genre">
            Genre
          </label>
          <Select
            id="genre"
            value={this.state.genre}
            options={genreOptions}
            onChange={this.onGenreUpdate}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="details">
            Additional Details
          </label>
          <textarea
            id="details"
            rows="3"
            className="c-new-book-form__input c-form__input--textarea"
            placeholder="Tell us more about your book!"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </div>
        <button
          className="c-button"
          onClick={this.onCreateBook}
        >
          List
        </button>
      </form>
    );
  }
}

NewBookForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(NewBookForm);
