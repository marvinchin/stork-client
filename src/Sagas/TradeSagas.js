import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { getUserTradesComplete, createTradeComplete } from '../ActionCreators/TradeActionCreators';
import { getUserTrades, createTrade } from '../Apis';

export function* handleGetUserTrades(action) {
  let res;
  try {
    res = yield call(getUserTrades);
  } catch (err) {
    yield put(getUserTradesComplete(err));
    return;
  }
  if (res.status === 200) {
    const { trades } = res.body;
    yield put(getUserTradesComplete(null, trades));
  } else if (res.status === 403) {
    const tradeErr = new Error('User not logged in');
    yield put(getUserTradesComplete(tradeErr));
  } else {
    const tradeErr = new Error('Failed to get trades for user');
    yield put(getUserTradesComplete(tradeErr));
  }
}

export function* handleCreateTrade(action) {
  const { bookId, offer, description } = action.payload;
  let res;

  try {
    res = yield call(createTrade, bookId, offer, description);
  } catch (err) {
    yield put(createTradeComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(createTradeComplete(null));
  } else {
    const { error } = res.body;
    yield put(createTradeComplete(new Error(error)));
  }
}

export const tradeSagas = [
  takeLatest(Actions.GET_USER_TRADES_PENDING, handleGetUserTrades),
  takeLatest(Actions.CREATE_TRADE_PENDING, handleCreateTrade),
];
