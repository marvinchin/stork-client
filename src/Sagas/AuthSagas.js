import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { loginUserComplete, updateUser } from '../ActionCreators/AuthActionCreators';
import { loginUser } from '../Apis';
import { changeRoute } from '../ActionCreators/RouteActionCreators';

export function* handleUserLogin(action) {
  const { username, password } = action.payload;
  let res;
  try {
    res = yield (call(loginUser, username, password));
  } catch (err) {
    yield put(loginUserComplete(null, err));
    return;
  }
  yield put(loginUserComplete(res.status));
}

export function* handleUserLoginComplete(action) {
  const { err, status, user } = action.payload;
  if (err) return;

  if (status === 200) {
    yield put(updateUser(user));
    yield put(changeRoute('/'));
  }
}

export default function* watchAuthSagas() {
  yield takeLatest(Actions.AUTH_USER_LOGIN_PENDING, handleUserLogin);
  yield takeLatest(Actions.AUTH_USER_LOGIN_COMPLETE, handleUserLoginComplete);
}
