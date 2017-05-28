import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { loginUserComplete, updateUser } from '../ActionCreators/AuthActionCreators';
import { loginUser } from '../Apis';
import { changeRoute } from '../ActionCreators/RouteActionCreators';

export function* handleUserLogin(action) {
  const { username, password } = action.payload;
  let res;
  // If error is caught, failed to send the request
  try {
    res = yield (call(loginUser, username, password));
  } catch (err) {
    yield put(loginUserComplete(err));
    return;
  }
  // If status code is 200 login is successful
  if (res.status === 200) {
    // TODO: Should return logged in user as part of body, for now use a placeholder
    const user = { username: 'test_user' };
    const { status } = res;
    yield put(loginUserComplete(null, user, status));
  } else {
  // Else, failed to login with credentials
    const loginFailedError = new Error('Unable to login with credentials');
    yield put(loginUserComplete(loginFailedError));
  }
}

export function* handleUserLoginComplete(action) {
  const { error, user } = action.payload;
  if (error) return;
  yield put(updateUser(error, user));
  yield put(changeRoute('/'));
}

export default function* watchAuthSagas() {
  yield [
    takeLatest(Actions.AUTH_USER_LOGIN_PENDING, handleUserLogin),
    takeLatest(Actions.AUTH_USER_LOGIN_COMPLETE, handleUserLoginComplete),
  ];
}
