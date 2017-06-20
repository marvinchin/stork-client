import React, { Component } from 'react';
import Select from 'react-select';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: { value: 'title', label: 'Title' },
      genre: { value: '', label: 'Any Genre' },
    };

    this.onSearchFieldUpdate = this.onSearchFieldUpdate.bind(this);
    this.onGenreUpdate = this.onGenreUpdate.bind(this);
  }

  onSearchFieldUpdate(searchField) {
    this.setState({
      searchField,
    });
  }

  onGenreUpdate(genre) {
    this.setState({
      genre,
    });
  }

  render() {
    const searchOptions = [
      { value: 'title', label: 'Title' },
      { value: 'author', label: 'Author' },
    ];

    const genreOptions = [
      { value: '', label: 'Any Genre' },
      { value: 'Sci-Fi', label: 'Sci-Fi' },
      { value: 'Fiction', label: 'Fiction' },
    ];

    const mainRow = (
      <div className="c-search__input l-form__input-group">
        <label htmlFor="searchInput">
          Search
        </label>
        <div className="l-search__main-row l-flex__row">
          <input
            className="c-form__input--text"
          />
          <Select
            id="searchField"
            className="c-search__field-select"
            value={this.state.searchField}
            options={searchOptions}
            onChange={this.onSearchFieldUpdate}
            clearable={false}
          />
        </div>
      </div>
    );

    const supplementaryRow = (
      <div className="l-flex__row">
        <div className="c-search__input l-form__input-group">
          <label htmlFor="genreInput">
            Genre
          </label>
          <Select
            id="genre"
            value={this.state.genre}
            options={genreOptions}
            onChange={this.onGenreUpdate}
            clearable={false}
          />
        </div>
      </div>
    );

    return (
      <div className="c-search">
        <div className="l-flex__col l-search__content">
          { mainRow }
          { supplementaryRow }
          <button className="c-button">
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
