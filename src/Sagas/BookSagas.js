import { call, put, takeLatest } from "redux-saga/effects";

import Actions from "../constants/Actions";
import {
  createBookComplete,
  getBookByIdComplete,
  getGenresComplete,
  getIndexBooksComplete,
  searchBooksComplete
} from "../ActionCreators/BookActionCreators";
import {
  createBook,
  getBookById,
  getGenres,
  getIndexBooks,
  searchBooks
} from "../Apis";
import { changeRoute } from "../ActionCreators/RouteActionCreators";

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
    const authError = new Error("User not logged in");
    yield put(createBookComplete(authError));
  } else {
    const createBookFailedError = new Error(
      "Failed to create book with provided information"
    );
    yield put(createBookComplete(createBookFailedError));
  }
}

export function* handleCreateBookComplete(action) {
  if (action.error) return;
  yield put(changeRoute("/index"));
}

export function* handleGetBookById(action) {
  const { bookId } = action.payload;
  let res;

  try {
    res = yield call(getBookById, bookId);
  } catch (err) {
    yield put(getBookByIdComplete(err));
    return;
  }

  if (res.status === 200) {
    const { book } = res.body;
    yield put(getBookByIdComplete(null, book));
  } else {
    const { error } = res.body;
    yield put(getBookByIdComplete(new Error(error)));
  }
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

export function* handleSearchBooks(action) {
  const { query, searchBy, genre } = action.payload;
  let res;

  try {
    res = yield call(searchBooks, query, searchBy, genre);
  } catch (err) {
    yield put(searchBooksComplete(err));
    return;
  }

  if (res.status === 200) {
    const { books } = res.body;
    yield put(searchBooksComplete(null, books));
  } else {
    const { error } = res.body;
    yield put(searchBooksComplete(new Error(error)));
  }
}

export const bookSagas = [
  takeLatest(Actions.BOOK_CREATE_PENDING, handleCreateBook),
  takeLatest(Actions.BOOK_CREATE_COMPLETE, handleCreateBookComplete),
  takeLatest(Actions.GET_BOOK_BY_ID_PENDING, handleGetBookById),
  takeLatest(Actions.GET_GENRES_PENDING, handleGetGenres),
  takeLatest(Actions.GET_INDEX_BOOKS_PENDING, handleGetIndexBooks),
  takeLatest(Actions.SEARCH_BOOKS_PENDING, handleSearchBooks)
];
