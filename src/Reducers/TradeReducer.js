import Actions from '../constants/Actions';

const initialState = {
  userTrades: [],
  tradeErr: null,
};

function handleGetUserTradesComplete(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const tradeErr = payload.error;
    newState = Object.assign({}, state, { userTrades: initialState.userTrades, tradeErr });
  } else {
    const { trades } = payload;
    newState = Object.assign({}, state, { userTrades: trades, tradeErr: null });
  }
  return newState;
}

function handleCreateTradeComplete(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const tradeErr = payload.error;
    newState = Object.assign({}, state, { tradeErr });
  } else {
    newState = Object.assign({}, state, { tradeErr: null });
  }
  return newState;
}

function resetTradeErrors(state) {
  const newState = Object.assign({}, state, { tradeErr: null });
  return newState;
}

export default function TradeReducer(state = initialState, action) {
  switch (action.type) {
    case (Actions.GET_USER_TRADES_COMPLETE):
      return handleGetUserTradesComplete(state, action);
    case (Actions.CREATE_TRADE_COMPLETE):
      return handleCreateTradeComplete(state, action);
    case (Actions.TRADE_RESET_ERRORS):
      return resetTradeErrors(state);
    default:
      return state;
  }
}
