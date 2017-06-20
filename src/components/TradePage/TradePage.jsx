import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookListing from '../BookListing';
import BookCollection from '../BookCollection';

class TradePage extends Component {
  render() {
    const { user, trade } = this.props;
    const { listUser, offerUser, listedBook, offeredBooks, details } = trade;

    const isListUser = (user.id === listUser.id);
    const otherUser = isListUser ? offerUser : listUser;

    const listLabel = isListUser ? `${otherUser.username} wants` : 'You want';
    const offerLabel = isListUser ? `${otherUser.username} offered` : 'You offered';

    let buttons;

    if (isListUser) {
      buttons = (
        <div className="l-flex__row l-trade-page__buttons">
          <button className="c-button">
            Accept
          </button>
          <button className="c-button">
            Reject
          </button>
        </div>
      );
    } else {
      buttons = (
        <button className="c-button">
          Cancel
        </button>
      );
    }

    return (
      <div className="c-trade-page">
        <div className="c-trade-page__title">
          Trade with {otherUser.username}
        </div>
        <div className="c-form l-flex__col">
          <div className="l-form__input-group">
            <label htmlFor="listedBook">
              {listLabel}
            </label>
            <div className="c-trade__listed-book">
              <BookListing {...listedBook} />
            </div>
          </div>
          <div className="l-form__input-group">
            <label htmlFor="offeredBooks">
              {offerLabel}
            </label>
            <div className="c-trade__offered-books">
              <BookCollection books={offeredBooks} isSelectable={isListUser} />
            </div>
          </div>
          <div className="l-form__input-group">
            <label htmlFor="details">
              Additional Details
            </label>
            <textarea
              id="details"
              rows="3"
              value={details}
              className="c-form__input--textarea"
              disabled
            />
          </div>
          {buttons}
        </div>
      </div>
    );
  }
}

TradePage.propTypes = {
  user: PropTypes.object,
  trade: PropTypes.object,
};

TradePage.defaultProps = {
  user: {
    id: 421,
    username: 'noobscrub',
  },
  trade: {
    id: 1,
    listedBook: {
      id: 1,
      title: 'Fifty Shades of Gray',
      author: 'E L James',
      genre: 'Non-Fiction',
      description: 'Good condition',
    },
    offeredBooks: [
      {
        id: 2,
        title: 'The Three Little Pigs',
        author: 'Big Bad Wolf',
        genre: 'Sci-Fi',
        description: 'The Three Little Pigs is a classic hit',
      },
      {
        id: 3,
        title: 'The Life and Times of Foo Yong Jie',
        author: 'Foo Yong Jie',
        genre: 'Fiction',
        description: 'Great book!',
      },
    ],
    details: 'Pick any one of the books I offered',
    offerUser: {
      id: 123,
      username: 'destinngeow',
    },
    listUser: {
      id: 421,
      username: 'noobscrub',
    },
    status: 'P',
  },
};

export default TradePage;
