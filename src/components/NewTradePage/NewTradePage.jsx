import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTradeForm from './NewTradeForm';

class NewTradePage extends Component {
  render() {
    return (
      <div className="c-new-trade-page">
        <div className="c-new-trade-page__title">
          Requesting trade with destinngeow
        </div>
        <NewTradeForm {...this.props} />
      </div>
    );
  }
}

NewTradePage.propTypes = {
  listedBook: PropTypes.object.isRequired,
  userBooks: PropTypes.array.isRequired,
};

NewTradePage.defaultProps = {
  listedBook: {
    id: 1,
    title: 'Fifty Shades of Gray',
    author: 'E L James',
    genre: 'Non-Fiction',
    description: 'Good condition',
  },
  userBooks: [
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
};

export default NewTradePage;
