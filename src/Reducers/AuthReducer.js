import Actions from '../constants/Actions';

const initialState = {
  user: null,
  authErr: null,
};

export function resetAuthErrors(state) {
  const newState = Object.assign({}, state, { authErr: null });
  return newState;
}

export function handleLoginComplete(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const authErr = payload.error;
    newState = Object.assign({}, state, { authErr });
  } else {
    const { user } = payload;
    newState = Object.assign({}, state, { user, authErr: null });
  }
  return newState;
}

export function handleRegisterComplete(state, action) {
  const { error, payload } = action;
  if (error) {
    const authErr = payload.error;
    const newState = Object.assign({}, state, { authErr });
    return newState;
  }
  return state;
}

export function handleAuthenticateUserComplete(state, action) {
  const { error, payload } = action;
  let newState;
  if (error) {
    const authErr = payload.error;
    newState = Object.assign({}, state, { user: null, authErr });
  } else {
    const { user } = payload;
    newState = Object.assign({}, state, { user, authErr: null });
  }
  return newState;
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case (Actions.AUTH_USER_LOGIN_COMPLETE):
      return handleLoginComplete(state, action);
    case (Actions.AUTH_USER_REGISTER_COMPLETE):
      return handleRegisterComplete(state, action);
    case (Actions.AUTHENTICATE_USER_COMPLETE):
      return handleAuthenticateUserComplete(state, action);
    case (Actions.AUTH_RESET_ERRORS):
      return resetAuthErrors(state);
    default:
      return state;
  }
}
