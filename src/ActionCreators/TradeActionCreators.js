import ActionTypes from "../constants/Actions";

export function getUserTrades() {
  return {
    type: ActionTypes.GET_USER_TRADES_PENDING,
    payload: {}
  };
}

export function getUserTradesComplete(error, trades) {
  if (error) {
    return {
      type: ActionTypes.GET_USER_TRADES_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_USER_TRADES_COMPLETE,
    payload: {
      trades
    }
  };
}

export function createTrade(book, offer, description) {
  return {
    type: ActionTypes.CREATE_TRADE_PENDING,
    payload: {
      book,
      offer,
      description
    }
  };
}

export function createTradeComplete(error) {
  if (error) {
    return {
      type: ActionTypes.CREATE_TRADE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.CREATE_TRADE_COMPLETE,
    payload: {}
  };
}

export function cancelTrade(trade) {
  return {
    type: ActionTypes.CANCEL_TRADE_PENDING,
    payload: {
      trade
    }
  };
}

export function cancelTradeComplete(error) {
  if (error) {
    return {
      type: ActionTypes.CANCEL_TRADE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.CANCEL_TRADE_COMPLETE,
    payload: {}
  };
}

export function acceptTrade(trade, selection) {
  return {
    type: ActionTypes.ACCEPT_TRADE_PENDING,
    payload: {
      trade,
      selection
    }
  };
}

export function acceptTradeComplete(error) {
  if (error) {
    return {
      type: ActionTypes.ACCEPT_TRADE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }
  return {
    type: ActionTypes.ACCEPT_TRADE_COMPLETE,
    payload: {}
  };
}

export function resetTradeErrors() {
  return {
    type: ActionTypes.TRADE_RESET_ERRORS,
    payload: {}
  };
}
