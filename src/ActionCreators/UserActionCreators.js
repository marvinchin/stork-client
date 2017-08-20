import ActionTypes from "../constants/Actions";

export function getUserProfile(username) {
  return {
    type: ActionTypes.GET_USER_PROFILE_PENDING,
    payload: {
      username
    }
  };
}

export function getUserProfileComplete(error, user) {
  if (error) {
    return {
      type: ActionTypes.GET_USER_PROFILE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_USER_PROFILE_COMPLETE,
    payload: {
      user
    }
  };
}

// TODO: Write tests for updateUserProfile action creators
export function updateUserProfile(
  username,
  description,
  profilePicture,
  gender,
  password
) {
  return {
    type: ActionTypes.UPDATE_USER_PROFILE_PENDING,
    payload: {
      username,
      description,
      profilePicture,
      gender,
      password
    }
  };
}

export function updateUserProfileComplete(error) {
  if (error) {
    return {
      type: ActionTypes.UPDATE_USER_PROFILE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.UPDATE_USER_PROFILE_COMPLETE,
    payload: {}
  };
}
