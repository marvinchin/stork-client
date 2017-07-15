import ActionTypes from '../constants/Actions';

export function getUserTrades(username) {
  return {
    type: ActionTypes.GET_USER_TRADES_PENDING,
    payload: {
      username,
    },
  };
}

export function getUserTradesComplete(error, trades) {
  if (error) {
    return {
      type: ActionTypes.GET_USER_TRADES_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.GET_USER_TRADES_COMPLETE,
    payload: {
      trades,
    },
  };
}
