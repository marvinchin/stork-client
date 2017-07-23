import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import BookListing from "../BookListing";
import BookCollection from "../BookCollection";
import {
  getTradeById,
  acceptTrade,
  cancelTrade,
  resetTradeErrors
} from "../../ActionCreators/TradeActionCreators";

const TRADE_PENDING = "P";
const TRADE_CANCELLED = "C";
const TRADE_ACCEPTED = "A";

class TradePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };

    this.onAcceptTrade = this.onAcceptTrade.bind(this);
    this.onCancelTrade = this.onCancelTrade.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(resetTradeErrors());
  }

  componentDidMount() {
    const { tradeId } = this.props.match.params;
    this.props.dispatch(getTradeById(tradeId));
  }

  onAcceptTrade(e) {
    e.preventDefault();
    const { tradeId } = this.props.match.params;
    const { selected } = this.state;
    this.props.dispatch(acceptTrade(tradeId, selected));
  }

  onCancelTrade(e) {
    e.preventDefault();
    const { tradeId } = this.props.match.params;
    this.props.dispatch(cancelTrade(tradeId));
  }

  renderErrorMessage() {
    const { tradeErr } = this.props;
    return (
      <div className="c-trade-page__error">
        {tradeErr != null ? tradeErr.message : null}
      </div>
    );
  }

  renderButtons() {
    const { trade, user } = this.props;
    if (trade.tradeStatus === TRADE_PENDING) {
      const isListUser = user.username === trade.listUser.username;
      if (isListUser) {
        return (
          <div className="l-flex__row l-trade-page__buttons">
            <button className="c-button" onClick={this.onAcceptTrade}>
              Accept
            </button>
            <button className="c-button" onClick={this.onCancelTrade}>
              Reject
            </button>
          </div>
        );
      }
      return (
        <button className="c-button" onClick={this.onCancelTrade}>
          Cancel
        </button>
      );
    }
    return null;
  }

  renderStatus() {
    const tradeStatus = this.props.trade.tradeStatus;
    if (tradeStatus === TRADE_ACCEPTED) {
      return (
        <div className="c-trade-page__trade-status">
          This trade has been accepted.
        </div>
      );
    } else if (tradeStatus === TRADE_CANCELLED) {
      return (
        <div className="c-trade-page__trade-status">
          This trade has been cancelled.
        </div>
      );
    }
    return null;
  }

  renderOfferedBooks() {
    const { trade, user } = this.props;
    const { listUser, offerUser } = trade;
    const isListUser = user.username === listUser.username;
    const otherUser = isListUser ? offerUser : listUser;

    let offerLabel;
    let renderBooks;

    if (trade.tradeStatus === TRADE_ACCEPTED) {
      const { selectedBook } = trade;

      renderBooks = <BookListing {...selectedBook} />;
      offerLabel = isListUser
        ? `${otherUser.username} selected`
        : "You selected";
    } else {
      const { offerBooks } = trade;
      const onBookSelect = (bookId, isSelected) => {
        if (isSelected) {
          this.setState(() => ({ selected: bookId }));
        } else if (!isSelected && this.state.selected === bookId) {
          this.setState(() => ({ selected: null }));
        }
      };
      renderBooks = (
        <BookCollection
          books={offerBooks}
          isSelectable={isListUser}
          onSelect={onBookSelect}
          selected={this.state.selected}
        />
      );
      offerLabel = isListUser ? `${otherUser.username} offered` : "You offered";
    }
    return (
      <div className="l-form__input-group">
        <label htmlFor="offeredBooks">
          {offerLabel}
        </label>
        <div className="c-trade__offered-books">
          {renderBooks}
        </div>
      </div>
    );
  }

  render() {
    const { trade } = this.props;

    if (trade) {
      const { user } = this.props;
      const { listUser, offerUser, listBook, description } = trade;

      const isListUser = user.username === listUser.username;
      const otherUser = isListUser ? offerUser : listUser;
      const listLabel = isListUser ? `${otherUser.username} wants` : "You want";

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
                <BookListing {...listBook} />
              </div>
            </div>
            {this.renderOfferedBooks()}
            <div className="l-form__input-group">
              <label htmlFor="details">Additional Details</label>
              <textarea
                id="details"
                rows="3"
                value={description}
                className="c-form__input--textarea"
                disabled
              />
            </div>
            {this.renderButtons()}
            {this.renderStatus()}
            {this.renderErrorMessage()}
          </div>
        </div>
      );
    }
    return null;
  }
}

TradePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  trade: PropTypes.object,
  tradeErr: PropTypes.instanceOf(Error)
};

TradePage.defaultProps = {
  trade: null,
  tradeErr: null
};

const mapStateToProps = state => ({
  user: state.auth.user,
  trade: state.trades.tradeById,
  tradeErr: state.trades.tradeErr
});

export default connect(mapStateToProps)(TradePage);
