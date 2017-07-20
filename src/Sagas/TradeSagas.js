import { call, put, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import {
  getUserTradesComplete,
  getTradeById as getTradeByIdActionCreator,
  getTradeByIdComplete,
  createTradeComplete,
  cancelTradeComplete,
  acceptTradeComplete
} from "../ActionCreators/TradeActionCreators";
import {
  getUserTrades,
  getTradeById,
  createTrade,
  cancelTrade,
  acceptTrade
} from "../Apis";
import { changeRoute } from "../ActionCreators/RouteActionCreators";

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
    const tradeErr = new Error("User not logged in");
    yield put(getUserTradesComplete(tradeErr));
  } else {
    const tradeErr = new Error("Failed to get trades for user");
    yield put(getUserTradesComplete(tradeErr));
  }
}

export function* handleGetTradeById(action) {
  const { tradeId } = action.payload;
  let res;

  try {
    res = yield call(getTradeById, tradeId);
  } catch (err) {
    yield put(getTradeByIdComplete(err));
    return;
  }
  if (res.status === 200) {
    const { trade } = res.body;
    yield put(getTradeByIdComplete(null, trade));
  } else {
    const { error } = res.body;
    yield put(getTradeByIdComplete(error));
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
  yield put(changeRoute("/inbox"));
}

export function* handleCancelTrade(action) {
  const { trade } = action.payload;
  let res;

  try {
    res = yield call(cancelTrade, trade);
  } catch (err) {
    yield put(cancelTradeComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(cancelTradeComplete(null));
    yield put(getTradeByIdActionCreator(trade));
  } else {
    const { error } = res.body;
    yield put(cancelTradeComplete(new Error(error)));
  }
}

export function* handleAcceptTrade(action) {
  const { trade, selection } = action.payload;
  let res;

  try {
    res = yield call(acceptTrade, trade, selection);
  } catch (err) {
    yield put(acceptTradeComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(acceptTradeComplete(null));
    yield put(getTradeByIdActionCreator(trade));
  } else {
    const { error } = res.body;
    yield put(acceptTradeComplete(new Error(error)));
  }
}

export const tradeSagas = [
  takeLatest(Actions.GET_USER_TRADES_PENDING, handleGetUserTrades),
  takeLatest(Actions.GET_TRADE_BY_ID_PENDING, handleGetTradeById),
  takeLatest(Actions.CREATE_TRADE_PENDING, handleCreateTrade),
  takeLatest(Actions.CREATE_TRADE_COMPLETE, handleCreateTradeComplete),
  takeLatest(Actions.CANCEL_TRADE_PENDING, handleCancelTrade),
  takeLatest(Actions.ACCEPT_TRADE_PENDING, handleAcceptTrade)
];
