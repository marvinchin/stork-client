import ActionTypes from '../constants/Actions';

export function getUserTrades() {
  return {
    type: ActionTypes.GET_USER_TRADES_PENDING,
    payload: {},
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
