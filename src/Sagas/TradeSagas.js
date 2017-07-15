import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { getUserTradesComplete } from '../ActionCreators/TradeActionCreators';
import { getUserTrades } from '../Apis';

export function* handleGetUserTrades(action) {
  const { username } = action.payload;
  let res;

  try {
    res = yield call(getUserTrades, username);
  } catch (err) {
    yield put(getUserTradesComplete(err));
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

export const tradeSagas = [
  takeLatest(Actions.GET_USER_TRADES_PENDING, handleGetUserTrades),
];
