import Actions from '../constants/Actions';

const initialState = null;

export function handleUpdateUser(state, action) {
  const { error, payload } = action;
  const { user } = payload;
  if (error) return state;
  return user;
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case (Actions.AUTH_UPDATE_USER_PENDING):
      return handleUpdateUser(state, action);
    default:
      return state;
  }
}
