import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TradeSummary extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    console.log('Clicked!');
  }

  renderUnread() {
    const { isRead } = this.props;
    if (!isRead) {
      return (
        <div className="c-trade-summary__unread" />
      );
    }
    return null;
  }

  render() {
    const { user, book } = this.props;
    const { username } = user;
    const { title, author } = book;
    return (
      <div className="c-trade-summary l-flex__row" role="button" tabIndex={0} onClick={this.onClick}>
        <div className="l-trade-summary__info">
          <div className="c-trade-summary__user">
            {username}
          </div>
          <div className="c-trade-summary__title">
            {title}
          </div>
          <div className="c-trade-summary__author">
            by {author}
          </div>
        </div>
        {this.renderUnread()}
      </div>
    );
  }
}

TradeSummary.propTypes = {
  user: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  isRead: PropTypes.bool.isRequired,
};

export default TradeSummary;
