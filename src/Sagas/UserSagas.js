import { call, put, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import {
  getUserProfileComplete,
  updateUserProfileComplete
} from "../ActionCreators/UserActionCreators";
import { changeRoute } from "../ActionCreators/RouteActionCreators";
import { getUserProfile, updateUserProfile } from "../Apis";

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

// TODO: Write tests for this saga
export function* handleUpdateUserProfile(action) {
  const {
    username,
    description,
    profilePicture,
    gender,
    password
  } = action.payload;
  let res;
  try {
    res = yield call(
      updateUserProfile,
      description,
      profilePicture,
      gender,
      password
    );
  } catch (err) {
    yield put(updateUserProfileComplete(err));
    return;
  }
  if (res.status === 200) {
    yield put(getUserProfileComplete(null));
    // TODO: Should have a better way to redirect user to current profile than
    // passing it in as a param
    yield put(changeRoute(`/user/${username}`));
  } else {
    const { error } = res.body;
    yield put(getUserProfileComplete(new Error(error)));
  }
}

export const userSagas = [
  takeLatest(Actions.GET_USER_PROFILE_PENDING, handleGetUserProfile),
  takeLatest(Actions.UPDATE_USER_PROFILE_PENDING, handleUpdateUserProfile)
];
