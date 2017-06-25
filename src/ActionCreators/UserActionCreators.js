import ActionTypes from '../constants/Actions';

export function getUserProfile(username) {
  return {
    type: ActionTypes.GET_USER_PROFILE_PENDING,
    payload: {
      username,
    },
  };
}

export function getUserProfileComplete(error, user) {
  if (error) {
    return {
      type: ActionTypes.GET_USER_PROFILE_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.GET_USER_PROFILE_COMPLETE,
    payload: {
      user,
    },
  };
}
