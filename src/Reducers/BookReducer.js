import Actions from "../constants/Actions";

const initialState = {
  genres: [],
  book: null,
  indexBooks: []
};

export function handleGetBookByIdComplete(state, action) {
  const { error, payload } = action;
  if (error) return state;
  const { book } = payload;
  const newState = Object.assign({}, state, { book });

  return newState;
}

export function handleGetGenresComplete(state, action) {
  const { error, payload } = action;
  if (error) return state;
  const { genres } = payload;
  const newState = Object.assign({}, state, { genres });

  return newState;
}

export function handleGetIndexBooksComplete(state, action) {
  const { error, payload } = action;
  if (error) return state;
  const { books } = payload;
  const newState = Object.assign({}, state, { indexBooks: books });

  return newState;
}

export default function BookReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOOK_BY_ID_COMPLETE:
      return handleGetBookByIdComplete(state, action);
    case Actions.GET_GENRES_COMPLETE:
      return handleGetGenresComplete(state, action);
    case Actions.GET_INDEX_BOOKS_COMPLETE:
      return handleGetIndexBooksComplete(state, action);
    default:
      return state;
  }
}
