import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BookListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isSelected: false
    };
    this.onClick = this.onClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id, selected } = nextProps;
    let isSelected;
    if (selected !== id) {
      isSelected = false;
    } else {
      isSelected = true;
    }

    this.setState({
      isSelected
    });
  }

  onSelectChange() {
    const { id, onSelect } = this.props;
    const updateState = previousState => ({
      isSelected: !previousState.isSelected
    });
    this.setState(updateState, () => {
      if (onSelect) {
        onSelect(id, this.state.isSelected);
      }
    });
  }

  onClick(event) {
    event.preventDefault();
    this.setState(previousState => ({ isExpanded: !previousState.isExpanded }));
  }

  renderTradeLink() {
    const { showTradeLink } = this.props;
    if (showTradeLink) {
      const bookId = this.props.id;
      const tradeUrl = `/trade/new/${bookId}`;
      return (
        <Link className="c-book-listing__trade-link" to={tradeUrl}>
          Make Offer
        </Link>
      );
    }
    return null;
  }

  renderDescription() {
    const { isExpanded } = this.state;
    if (!isExpanded) {
      return null;
    }
    const { description, showOwner } = this.props;
    const descriptionText = description === "" ? "No Description" : description;

    let ownerLink;
    if (showOwner) {
      const { ownerUsername } = this.props;
      const ownerProfileUrl = `/user/${ownerUsername}`;
      ownerLink = (
        <Link className="c-book-listing__owner-link" to={ownerProfileUrl}>
          Listed by {ownerUsername}
        </Link>
      );
    } else {
      ownerLink = null;
    }

    return (
      <div className="c-book-listing__description">
        <p>
          {descriptionText}
        </p>
        <div className="l-flex__row">
          {ownerLink}
          {this.renderTradeLink()}
        </div>
      </div>
    );
  }

  renderCheckbox() {
    const { isSelectable } = this.props;
    const preventClickPropagate = event => {
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

  renderExpandMarker() {
    const { isExpanded } = this.state;
    const marker = !isExpanded
      ? <span className="c-book-listing__expand-marker glyphicon glyphicon-menu-down" />
      : <span className="c-book-listing__expand-marker glyphicon glyphicon-menu-up" />;
    return marker;
  }

  renderGenre() {
    const { genre } = this.props;
    if (genre === "Fiction") {
      return <div className="c-book-listing__genre-placeholder--fiction" />;
    }
    return <div className="c-book-listing__genre-placeholder--non-fiction" />;
  }

  render() {
    const { title, author } = this.props;

    return (
      <div
        className="c-book-listing"
        role="button"
        tabIndex={0}
        onClick={this.onClick}
      >
        <div className="l-book-listing__header l-flex__row">
          <div className="c-book-listing__genre">
            {this.renderGenre()}
          </div>
          <div className="l-book-listing__info">
            <div className="c-book-listing__title">
              {title}
            </div>
            <div className="c-book-listing__author">
              by {author}
            </div>
          </div>
          {this.renderCheckbox()}
          {this.renderExpandMarker()}
        </div>
        {this.renderDescription()}
      </div>
    );
  }
}

BookListing.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string,
  ownerUsername: PropTypes.string,
  isSelectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.string,
  showTradeLink: PropTypes.bool,
  showOwner: PropTypes.bool
};

BookListing.defaultProps = {
  author: "Not Specified",
  description: "No Description",
  isSelectable: false,
  onSelect: null,
  selected: null,
  showTradeLink: false,
  showOwner: true,
  ownerUsername: ""
};

export default BookListing;
