import { put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { changeRouteComplete } from '../ActionCreators/RouteActionCreators';
import history from '../history';

export function* handleChangeRoute(action) {
  const { route } = action.payload;
  history.push(route);
  yield put(changeRouteComplete());
}

export default function* watchRouteSagas() {
  yield takeLatest(Actions.ROUTE_CHANGE_PENDING, handleChangeRoute);
}
