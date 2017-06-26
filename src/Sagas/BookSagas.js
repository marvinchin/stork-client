import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from '../constants/Actions';
import { createBookComplete, getGenresComplete, getIndexBooksComplete } from '../ActionCreators/BookActionCreators';
import { createBook, getGenres, getIndexBooks } from '../Apis';
import { changeRoute } from '../ActionCreators/RouteActionCreators';

export function* handleCreateBook(action) {
  const { title, author, genre, description } = action.payload;
  let res;

  try {
    res = yield call(createBook, title, author, genre, description);
  } catch (err) {
    yield put(createBookComplete(err));
    return;
  }

  if (res.status === 200) {
    yield put(createBookComplete(null));
  } else if (res.status === 403) {
    const authError = new Error('User not logged in');
    yield put(createBookComplete(authError));
  } else {
    const createBookFailedError = new Error('Failed to create book with provided information');
    yield put(createBookComplete(createBookFailedError));
  }
}

export function* handleCreateBookComplete(action) {
  if (action.error) return;
  yield put(changeRoute('/'));
}

export function* handleGetGenres() {
  let res;

  try {
    res = yield call(getGenres);
  } catch (err) {
    yield put(getGenresComplete(err));
    return;
  }
  const { genres } = res.body;
  yield put(getGenresComplete(null, genres));
}

export function* handleGetIndexBooks() {
  let res;

  try {
    res = yield call(getIndexBooks);
  } catch (err) {
    yield put(getIndexBooksComplete(err));
    return;
  }
  const { books } = res.body;
  yield put(getIndexBooksComplete(null, books));
}

export const bookSagas = [
  takeLatest(Actions.BOOK_CREATE_PENDING, handleCreateBook),
  takeLatest(Actions.BOOK_CREATE_COMPLETE, handleCreateBookComplete),
  takeLatest(Actions.GET_GENRES_PENDING, handleGetGenres),
  takeLatest(Actions.GET_INDEX_BOOKS_PENDING, handleGetIndexBooks),
];

