import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookListing extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.setState(previousState => (
      { expanded: !previousState.expanded }
    ));
  }

  renderDescription() {
    const { expanded } = this.state;
    if (!expanded) {
      return null;
    }
    const { description } = this.props;
    return (
      <div className="c-book-listing__description">
        <p>{ description }</p>
      </div>
    );
  }

  render() {
    const { title, author } = this.props;
    return (
      <div className="c-book-listing" role="button" tabIndex={0} onClick={this.onClick}>
        <div className="l-book-listing__header l-flex__row ">
          <div className="l-book-listing__info">
            <div className="c-book-listing__title">
              {title}
            </div>
            <div className="c-book-listing__author">
              by {author}
            </div>
          </div>
          <div className="c-book-listing__genre">
            <div className="c-book-listing__genre-placeholder" />
          </div>
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
};

BookListing.defaultProps = {
  author: 'Not Specified',
  description: 'No Description',
};


export default BookListing;
