import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewTradeForm from './NewTradeForm';
import { createTrade } from '../../ActionCreators/TradeActionCreators';

class NewTradePage extends Component {
  render() {
    const { listedBook } = this.props;
    const listedBookId = listedBook.id;
    const handleTradeSubmit = (offeredBookIds, description) => {
      this.props.dispatch(createTrade(listedBookId, offeredBookIds, description));
    };

    return (
      <div className="c-new-trade-page">
        <div className="c-new-trade-page__title">
          Requesting trade with destinngeow
        </div>
        <NewTradeForm {...this.props} handleTradeSubmit={handleTradeSubmit} />
      </div>
    );
  }
}

NewTradePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

const mapStateToProps = state => (
  {
    userBooks: state.auth.user.books,
  }
);

export default connect(mapStateToProps)(NewTradePage);
