import React, { Component } from 'react';
import Select from 'react-select';

class NewBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'None',
    };

    this.onGenreUpdate = this.onGenreUpdate.bind(this);
  }

  onGenreUpdate(genre) {
    this.setState({
      genre,
    });
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
            ref={(input) => {
              this.title = input;
            }}
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
            ref={(input) => {
              this.author = input;
            }}
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
            ref={(input) => {
              this.details = input;
            }}
          />
        </div>
        <button
          className="c-button"
        >
          List
        </button>
      </form>
    );
  }
}

export default NewBookForm;
