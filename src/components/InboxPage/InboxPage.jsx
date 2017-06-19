import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TradeSummary from './TradeSummary';

class InboxPage extends Component {

  renderTrades() {
    const { trades } = this.props;
    return trades.map(trade => (
      <TradeSummary key={trade.id} {...trade} />
    ));
  }

  render() {
    return (
      <div className="c-inbox">
        <div className="c-inbox__title">
          Your Trades
        </div>
        <div className="c-inbox__trades">
          { this.renderTrades() }
        </div>
      </div>
    );
  }
}

InboxPage.propTypes = {
  trades: PropTypes.array.isRequired,
};

InboxPage.defaultProps = {
  trades: [
    {
      id: 1,
      user: {
        username: 'destinngeow',
      },
      book: {
        id: 1,
        title: 'Tentacles 101',
        author: 'Squidward',
      },
      isRead: false,
    },
    {
      id: 2,
      user: {
        username: 'noobscrub',
      },
      book: {
        id: 4,
        title: 'Overwatch for Dummies',
        author: 'Lim Shi Min',
      },
      isRead: false,
    },
    {
      id: 4,
      user: {
        username: 'yj123',
      },
      book: {
        id: 7,
        title: 'Linear Algebra',
        author: 'Wang Fei',
      },
      isRead: true,
    },
  ],
};

export default InboxPage;

