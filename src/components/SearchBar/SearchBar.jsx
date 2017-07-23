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
      query: "",
      searchBy: { value: "title", label: "Title" },
      genre: null
    };

    this.onQueryUpdate = this.onQueryUpdate.bind(this);
    this.onSearchByUpdate = this.onSearchByUpdate.bind(this);
    this.onGenreUpdate = this.onGenreUpdate.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onListBookClick = this.onListBookClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGenres());
  }

  onQueryUpdate(e) {
    this.setState({ query: e.target.value });
  }

  onSearchByUpdate(searchBy) {
    this.setState({
      searchBy
    });
  }

  onGenreUpdate(genre) {
    this.setState({
      genre
    });
  }

  onSearchClick(e) {
    e.preventDefault();
    const { onSearch } = this.props;
    const { query, searchBy, genre } = this.state;
    const searchByValue = searchBy ? searchBy.value : null;
    const genreValue = genre ? [genre.value] : [];

    onSearch(query, searchByValue, genreValue);
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

    const genreNullOption = {
      value: null,
      label: "No Restriction"
    };
    const genreOptionsWithNull = [genreNullOption, ...genreOptions];

    const mainRow = (
      <div className="c-search__input l-form__input-group">
        <label htmlFor="searchInput">Search</label>
        <div className="l-search__main-row l-flex__row">
          <input
            className="c-form__input--text"
            value={this.state.query}
            onChange={this.onQueryUpdate}
          />
          <Select
            id="searchField"
            className="c-search__field-select"
            value={this.state.searchBy}
            options={searchOptions}
            onChange={this.onSearchByUpdate}
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
            options={genreOptionsWithNull}
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
            <button className="c-button" onClick={this.onSearchClick}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  genres: state.books.genres
});

export default connect(mapStateToProps)(SearchBar);
