import ActionTypes from '../constants/Actions';

export function loginUser(error, username, password) {
  return {
    type: ActionTypes.AUTH_USER_LOGIN_PENDING,
    payload: {
      username,
      password,
    },
  };
}

export function loginUserComplete(error, user, status) {
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
      user,
      status,
    },
  };
}

export function updateUser(error, user) {
  return {
    type: ActionTypes.AUTH_UPDATE_USER_PENDING,
    payload: {
      user,
    },
  };
}

// Consider, where should validation be done?
// Maybe on button click do validation on page first?
// Or do it in the saga?
export function registerUser(error, username, password, email) {
  return {
    type: ActionTypes.AUTH_USER_REGISTER_PENDING,
    payload: {
      username,
      password,
      email,
    },
  };
}

export function registerUserComplete(error, user) {
  if (error) {
    return {
      type: ActionTypes.AUTH_USER_REGISTER_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }
  return {
    type: ActionTypes.AUTH_USER_REGISTER_COMPLETE,
    payload: {
      user,
    },
  };
}
