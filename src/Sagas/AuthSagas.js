import { call, put, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import {
  authenticateUserComplete,
  loginUserComplete,
  logoutUserComplete,
  updateUser,
  registerUserComplete
} from "../ActionCreators/AuthActionCreators";
import { authenticateUser, loginUser, logoutUser, registerUser } from "../Apis";
import { setUser, unsetUser } from "../socket";
import { changeRoute } from "../ActionCreators/RouteActionCreators";

export function* handleAuthenticateUser() {
  let res;

  yield put(updateUser(null, null));
  try {
    res = yield call(authenticateUser);
  } catch (err) {
    yield put(authenticateUserComplete(err));
    yield put(changeRoute("/login"));
    return;
  }

  const { authenticated, user } = res.body;
  if (authenticated) {
    yield put(updateUser(null, user));
    yield put(authenticateUserComplete(null, user));
    yield call(setUser, user.username);
    return;
  }
  const authFailedError = new Error("Unable to authenticate user");
  yield put(authenticateUserComplete(authFailedError));
  yield put(changeRoute("/login"));
}

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
    const { user } = res.body;
    yield put(loginUserComplete(null, user));
    yield call(setUser, user.username);
  } else {
    // Else, failed to login with credentials
    const loginFailedError = new Error("Unable to login with credentials");
    yield put(loginUserComplete(loginFailedError));
  }
}

export function* handleUserLoginComplete(action) {
  const { error } = action.payload;
  if (error) return;
  yield put(changeRoute("/index"));
}

export function* handleUserLogout() {
  let res;

  try {
    res = yield call(logoutUser);
  } catch (err) {
    yield put(logoutUserComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(logoutUserComplete());
    yield call(unsetUser);
  } else {
    const { error } = res.body;
    yield put(logoutUserComplete(error));
  }
}

export function* handleUserLogoutComplete(action) {
  const { error } = action.payload;
  if (error) return;
  yield put(changeRoute("/"));
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
    const { user } = res.body;
    yield put(registerUserComplete(null, user));
  } else {
    const { error } = res.body;
    const registerFailedError = new Error(error);
    yield put(registerUserComplete(registerFailedError));
  }
}

export function* handleUserRegisterComplete(action) {
  const { error } = action.payload;
  if (error) return;
  yield put(changeRoute("/login"));
}

export const authSagas = [
  takeLatest(Actions.AUTHENTICATE_USER_PENDING, handleAuthenticateUser),
  takeLatest(Actions.AUTH_USER_LOGIN_PENDING, handleUserLogin),
  takeLatest(Actions.AUTH_USER_LOGIN_COMPLETE, handleUserLoginComplete),
  takeLatest(Actions.AUTH_USER_LOGOUT_PENDING, handleUserLogout),
  takeLatest(Actions.AUTH_USER_LOGOUT_COMPLETE, handleUserLogoutComplete),
  takeLatest(Actions.AUTH_USER_REGISTER_PENDING, handleUserRegister),
  takeLatest(Actions.AUTH_USER_REGISTER_COMPLETE, handleUserRegisterComplete)
];
