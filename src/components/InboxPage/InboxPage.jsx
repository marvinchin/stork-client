import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TradeSummary from "./TradeSummary";
import { getUserTrades } from "../../ActionCreators/TradeActionCreators";

const TRADE_CANCELLED = "C";

class InboxPage extends Component {
  componentDidMount() {
    this.props.dispatch(getUserTrades());
  }

  renderTrades() {
    const { trades, user } = this.props;
    const filteredTrades = trades.filter(
      trade => trade.tradeStatus !== TRADE_CANCELLED
    );
    return filteredTrades.map(trade => {
      const otherUser =
        user.username !== trade.listUser.username
          ? trade.listUser
          : trade.offerUser;
      const tradeUrl = `/trade/${trade.id}`;

      return (
        <Link key={trade.id} to={tradeUrl}>
          <TradeSummary
            key={trade.id}
            user={otherUser}
            book={trade.listBook}
            isRead
          />
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="c-inbox">
        <div className="c-inbox__title">Your Trades</div>
        <div className="c-inbox__trades">
          {this.renderTrades()}
        </div>
      </div>
    );
  }
}

InboxPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trades: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  trades: state.trades.userTrades
});

export default connect(mapStateToProps)(InboxPage);
