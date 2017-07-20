import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { connect } from "react-redux";

import { getGenres } from "../../ActionCreators/BookActionCreators";
import { changeRoute } from "../../ActionCreators/RouteActionCreators";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: { value: "title", label: "Title" },
      genre: null
    };

    this.onSearchFieldUpdate = this.onSearchFieldUpdate.bind(this);
    this.onGenreUpdate = this.onGenreUpdate.bind(this);
    this.onListBookClick = this.onListBookClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGenres());
  }

  onSearchFieldUpdate(searchField) {
    this.setState({
      searchField
    });
  }

  onGenreUpdate(genre) {
    this.setState({
      genre
    });
  }

  onListBookClick(e) {
    e.preventDefault();
    this.props.dispatch(changeRoute("/book/new"));
  }

  render() {
    const searchOptions = [
      { value: "title", label: "Title" },
      { value: "author", label: "Author" }
    ];

    const { genres } = this.props;
    const genreOptions = genres.map(genre => ({
      value: genre,
      label: genre
    }));

    const mainRow = (
      <div className="c-search__input l-form__input-group">
        <label htmlFor="searchInput">Search</label>
        <div className="l-search__main-row l-flex__row">
          <input className="c-form__input--text" />
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
          <label htmlFor="genreInput">Genre</label>
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
          {mainRow}
          {supplementaryRow}
          <div className="l-flex__row">
            <button className="c-button" onClick={this.onListBookClick}>
              List Book!
            </button>
            <button className="c-button">Search</button>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  genres: state.books.genres
});

export default connect(mapStateToProps)(SearchBar);
