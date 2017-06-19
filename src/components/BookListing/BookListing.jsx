import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isSelected: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange() {
    this.setState({
      isSelected: !this.state.isSelected,
    });
    // Handle redux state change here
  }

  onClick(event) {
    event.preventDefault();
    this.setState(previousState => (
      { isExpanded: !previousState.isExpanded }
    ));
  }

  renderDescription() {
    const { isExpanded } = this.state;
    if (!isExpanded) {
      return null;
    }
    const { description } = this.props;
    return (
      <div className="c-book-listing__description">
        <p>{ description }</p>
      </div>
    );
  }

  renderCheckbox() {
    const { isSelectable } = this.props;
    const preventClickPropagate = (event) => {
      event.stopPropagation();
    };

    if (isSelectable) {
      return (
        <input
          type="checkbox"
          className="c-book-listing__checkbox"
          onChange={this.onSelectChange}
          onClick={preventClickPropagate}
          checked={this.state.isSelected}
        />
      );
    }
    return null;
  }

  render() {
    const { title, author } = this.props;

    return (
      <div className="c-book-listing" role="button" tabIndex={0} onClick={this.onClick}>
        <div className="l-book-listing__header l-flex__row">
          <div className="c-book-listing__genre">
            <div className="c-book-listing__genre-placeholder" />
          </div>
          <div className="l-book-listing__info">
            <div className="c-book-listing__title">
              { title }
            </div>
            <div className="c-book-listing__author">
              by { author }
            </div>
          </div>
          { this.renderCheckbox() }
        </div>
        { this.renderDescription() }
      </div>
    );
  }
}

BookListing.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string,
  isSelectable: PropTypes.bool,
};

BookListing.defaultProps = {
  author: 'Not Specified',
  description: 'No Description',
  isSelectable: false,
};


export default BookListing;
