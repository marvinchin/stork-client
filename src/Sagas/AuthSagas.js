import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { loginUserComplete, updateUser, registerUserComplete } from '../ActionCreators/AuthActionCreators';
import { loginUser, registerUser } from '../Apis';
import { changeRoute } from '../ActionCreators/RouteActionCreators';

export function* handleUserLogin(action) {
  const { username, password } = action.payload;
  let res;
  // If error is caught, failed to send the request
  try {
    res = yield call(loginUser, username, password);
  } catch (err) {
    yield put(loginUserComplete(err));
    return;
  }
  // If status code is 200 login is successful
  if (res.status === 200) {
    // TODO: Should return logged in user as part of body, for now use a placeholder
    const user = { username: 'test_user' };
    const { status } = res; // do we need status, if its already resolved here?
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

export function* handleUserRegister(action) {
  const { username, password, email } = action.payload;
  let res;

  try {
    res = yield call(registerUser, username, password, email);
  } catch (err) {
    yield put(registerUserComplete(err));
    return;
  }
  if (res.status === 200) {
    const user = { username: 'test_user' }; // temporary placeholder for user returned by server
    yield put(registerUserComplete(null, user));
  } else {
    const registerFailedError = new Error('Unable to register user');
    yield put(registerUserComplete(registerFailedError));
  }
}

export function* handleUserRegisterComplete(action) {
  const { error } = action.payload;
  if (error) return;
  yield put(changeRoute('/'));
}

export const authSagas = [
  takeLatest(Actions.AUTH_USER_LOGIN_PENDING, handleUserLogin),
  takeLatest(Actions.AUTH_USER_LOGIN_COMPLETE, handleUserLoginComplete),
  takeLatest(Actions.AUTH_USER_REGISTER_PENDING, handleUserRegister),
  takeLatest(Actions.AUTH_USER_REGISTER_COMPLETE, handleUserRegisterComplete),
];
