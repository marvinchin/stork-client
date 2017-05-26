import ActionTypes from '../constants/Actions';

export function loginUser(username, password) {
  return {
    type: ActionTypes.AUTH_USER_LOGIN_PENDING,
    payload: {
      username,
      password,
    },
  };
}

export function loginUserComplete(status, error) {
  if (error) {
    return {
      type: ActionTypes.AUTH_USER_LOGIN_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.AUTH_USER_LOGIN_COMPLETE,
    payload: {
      status,
    },
  };
}

export function updateUser(user) {
  return {
    type: ActionTypes.AUTH_UPDATE_USER_PENDING,
    payload: {
      user,
    },
  };
}
