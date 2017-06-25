import Actions from '../constants/Actions';

const initialState = {
  genres: [],
  indexBooks: [],
};

export function handleGetGenresComplete(state = initialState, action) {
  const { error, payload } = action;
  if (error) return state;
  const { genres } = payload;
  const newState = Object.assign({}, state, { genres });

  return newState;
}

export function handleGetIndexBooksComplete(state = initialState, action) {
  const { error, payload } = action;
  if (error) return state;
  const { books } = payload;
  const newState = Object.assign({}, state, { indexBooks: books });

  return newState;
}

export default function BookReducer(state = initialState, action) {
  switch (action.type) {
    case (Actions.GET_GENRES_COMPLETE):
      return handleGetGenresComplete(state, action);
    case (Actions.GET_INDEX_BOOKS_COMPLETE):
      return handleGetIndexBooksComplete(state, action);
    default:
      return state;
  }
}
