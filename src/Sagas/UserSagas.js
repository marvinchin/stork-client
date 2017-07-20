import { call, put, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import { getUserProfileComplete } from "../ActionCreators/UserActionCreators";
import { getUserProfile } from "../Apis";

export function* handleGetUserProfile(action) {
  const { username } = action.payload;
  let res;
  try {
    res = yield call(getUserProfile, username);
  } catch (err) {
    yield put(getUserProfileComplete(err));
    return;
  }
  const { user } = res.body;
  yield put(getUserProfileComplete(null, user));
}

export const userSagas = [
  takeLatest(Actions.GET_USER_PROFILE_PENDING, handleGetUserProfile)
];
