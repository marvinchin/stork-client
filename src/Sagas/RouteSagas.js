import { put, call, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import { changeRouteComplete } from "../ActionCreators/RouteActionCreators";
import history from "../history";

export function* handleChangeRoute(action) {
  const { route } = action.payload;
  yield call(history.push, route);
  yield put(changeRouteComplete());
}

export const routeSagas = [
  takeLatest(Actions.ROUTE_CHANGE_PENDING, handleChangeRoute)
];
