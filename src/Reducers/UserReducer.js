import Actions from '../constants/Actions';

const initialState = {
  user: null,
};

export function handleGetUserProfileComplete(state = initialState, action) {
  const { error, payload } = action;
  if (error) return state;
  const { user } = payload;
  const newState = Object.assign({}, state, { user });

  return newState;
}

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case (Actions.GET_USER_PROFILE_COMPLETE):
      return handleGetUserProfileComplete(state, action);
    default:
      return state;
  }
}
