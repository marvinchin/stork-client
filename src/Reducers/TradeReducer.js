import Actions from "../constants/Actions";

const initialState = {
  userTrades: [],
  tradeById: null,
  tradeErr: null
};

function handleGetUserTradesComplete(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const tradeErr = payload.error;
    newState = Object.assign({}, state, {
      userTrades: initialState.userTrades,
      tradeErr
    });
  } else {
    const { trades } = payload;
    newState = Object.assign({}, state, { userTrades: trades, tradeErr: null });
  }
  return newState;
}

function handleGetTradeById(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const tradeErr = payload.error;
    newState = Object.assign({}, state, {
      tradeById: initialState.tradeById,
      tradeErr
    });
  } else {
    const { trade } = payload;
    newState = Object.assign({}, state, {
      tradeById: trade,
      tradeErr: null
    });
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

function handleCancelTradeComplete(state, action) {
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

function handleAcceptTradeComplete(state, action) {
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
    case Actions.GET_USER_TRADES_COMPLETE:
      return handleGetUserTradesComplete(state, action);
    case Actions.GET_TRADE_BY_ID_COMPLETE:
      return handleGetTradeById(state, action);
    case Actions.CREATE_TRADE_COMPLETE:
      return handleCreateTradeComplete(state, action);
    case Actions.CANCEL_TRADE_COMPLETE:
      return handleCancelTradeComplete(state, action);
    case Actions.ACCEPT_TRADE_COMPLETE:
      return handleAcceptTradeComplete(state, action);
    case Actions.TRADE_RESET_ERRORS:
      return resetTradeErrors(state);
    default:
      return state;
  }
}
