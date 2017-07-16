import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import {
  getUserTradesComplete,
  createTradeComplete,
  cancelTradeComplete,
} from '../ActionCreators/TradeActionCreators';
import { getUserTrades, createTrade, cancelTrade } from '../Apis';
import { changeRoute } from '../ActionCreators/RouteActionCreators';

export function* handleGetUserTrades() {
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
  const { book, offer, description } = action.payload;
  let res;

  try {
    res = yield call(createTrade, book, offer, description);
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

export function* handleCreateTradeComplete(action) {
  const { error } = action.payload;
  if (error) return;
  yield put(changeRoute('/inbox'));
}

export function* handleCancelTrade(action) {
  const { bookId } = action.payload;
  let res;

  try {
    res = yield call(cancelTrade, bookId);
  } catch (err) {
    yield put(cancelTradeComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(cancelTradeComplete(null));
  } else {
    const { error } = res.body;
    yield put(cancelTradeComplete(new Error(error)));
  }
}

export const tradeSagas = [
  takeLatest(Actions.GET_USER_TRADES_PENDING, handleGetUserTrades),
  takeLatest(Actions.CREATE_TRADE_PENDING, handleCreateTrade),
  takeLatest(Actions.CREATE_TRADE_COMPLETE, handleCreateTradeComplete),
  takeLatest(Actions.CANCEL_TRADE_PENDING, handleCancelTrade),
];
