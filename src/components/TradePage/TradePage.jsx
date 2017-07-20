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

  render() {
    const { trade } = this.props;

    if (trade) {
      const { user } = this.props;
      const { listUser, offerUser, listBook, offerBooks, description } = trade;

      const isListUser = user.id === listUser.id;
      const otherUser = isListUser ? offerUser : listUser;

      const onBookSelect = (bookId, isSelected) => {
        if (isSelected) {
          this.setState(() => ({ selected: bookId }));
        } else if (!isSelected && this.state.selected === bookId) {
          this.setState(() => ({ selected: null }));
        }
      };

      const listLabel = isListUser ? `${otherUser.username} wants` : "You want";
      const offerLabel = isListUser
        ? `${otherUser.username} offered`
        : "You offered";

      let buttons;

      if (isListUser) {
        buttons = (
          <div className="l-flex__row l-trade-page__buttons">
            <button className="c-button" onClick={this.onAcceptTrade}>
              Accept
            </button>
            <button className="c-button" onClick={this.onCancelTrade}>
              Reject
            </button>
          </div>
        );
      } else {
        buttons = <button className="c-button">Cancel</button>;
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
                <BookListing {...listBook} />
              </div>
            </div>
            <div className="l-form__input-group">
              <label htmlFor="offeredBooks">
                {offerLabel}
              </label>
              <div className="c-trade__offered-books">
                <BookCollection
                  books={offerBooks}
                  isSelectable={isListUser}
                  onSelect={onBookSelect}
                />
              </div>
            </div>
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
            {buttons}
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
  trade: PropTypes.object
};

TradePage.defaultProps = {
  trade: null
};

const mapStateToProps = state => ({
  user: state.auth.user,
  trade: state.trades.tradeById
});

export default connect(mapStateToProps)(TradePage);
