import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewTradeForm from './NewTradeForm';
import { getBookById } from '../../ActionCreators/BookActionCreators';
import { createTrade, resetTradeErrors } from '../../ActionCreators/TradeActionCreators';

class NewTradePage extends Component {
  componentWillMount() {
    this.props.dispatch(resetTradeErrors());
  }

  componentDidMount() {
    const { bookId } = this.props.match.params;
    this.props.dispatch(getBookById(bookId));
  }

  render() {
    const { listedBook } = this.props;

    if (listedBook) {
      const listedBookId = listedBook.id;
      const handleTradeSubmit = (offeredBookIds, description) => {
        this.props.dispatch(createTrade(listedBookId, offeredBookIds, description));
      };

      return (
        <div className="c-new-trade-page">
          <div className="c-new-trade-page__title">
            Requesting trade with {listedBook.ownerUsername}
          </div>
          <NewTradeForm {...this.props} handleTradeSubmit={handleTradeSubmit} />
        </div>
      );
    }
    return null;
  }
}

NewTradePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  listedBook: PropTypes.object,
  userBooks: PropTypes.array.isRequired,
  tradeErr: PropTypes.instanceOf(Error),
};

NewTradePage.defaultProps = {
  listedBook: null,
  tradeErr: null,
};

const mapStateToProps = state => (
  {
    listedBook: state.books.book,
    userBooks: state.auth.user.books,
    tradeErr: state.trades.tradeErr,
  }
);

export default connect(mapStateToProps)(NewTradePage);
