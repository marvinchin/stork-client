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

export function getTradeById(tradeId) {
  return {
    type: ActionTypes.GET_TRADE_BY_ID_PENDING,
    payload: {
      tradeId
    }
  };
}

export function getTradeByIdComplete(error, trade) {
  if (error) {
    return {
      type: ActionTypes.GET_TRADE_BY_ID_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_TRADE_BY_ID_COMPLETE,
    payload: {
      trade
    }
  };
}

export function getTradeMessages(tradeId) {
  return {
    type: ActionTypes.GET_TRADE_MESSAGES_PENDING,
    payload: {
      tradeId
    }
  };
}

export function getTradeMessagesComplete(error, messages) {
  if (error) {
    return {
      type: ActionTypes.GET_TRADE_MESSAGES_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_TRADE_MESSAGES_COMPLETE,
    payload: {
      messages
    }
  };
}

export function newMessageEvent(tradeId) {
  return {
    type: ActionTypes.NEW_MESSAGE_EVENT,
    payload: {
      tradeId
    }
  };
}

export function sendTradeMessage(tradeId, content) {
  return {
    type: ActionTypes.SEND_TRADE_MESSAGE_PENDING,
    payload: {
      tradeId,
      content
    }
  };
}

export function sendTradeMessageComplete(error, message) {
  if (error) {
    return {
      type: ActionTypes.SEND_TRADE_MESSAGE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.SEND_TRADE_MESSAGE_COMPLETE,
    payload: {
      message
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
