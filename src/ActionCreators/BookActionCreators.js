import ActionTypes from '../constants/Actions';

export function createBook(title, author, genre, description = '') {
  return {
    type: ActionTypes.BOOK_CREATE_PENDING,
    payload: {
      title,
      author,
      genre,
      description,
    },
  };
}

export function createBookComplete(error) {
  if (error) {
    return {
      type: ActionTypes.BOOK_CREATE_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.BOOK_CREATE_COMPLETE,
    payload: {},
  };
}

export function getGenres() {
  return {
    type: ActionTypes.GET_GENRES_PENDING,
    payload: {},
  };
}

export function getGenresComplete(error, genres) {
  if (error) {
    return {
      type: ActionTypes.GET_GENRES_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.GET_GENRES_COMPLETE,
    payload: {
      genres,
    },
  };
}

export function getIndexBooks() {
  return {
    type: ActionTypes.GET_INDEX_BOOKS_PENDING,
    payload: {},
  };
}

export function getIndexBooksComplete(error, books) {
  if (error) {
    return {
      type: ActionTypes.GET_INDEX_BOOKS_COMPLETE,
      error: true,
      payload: {
        error,
      },
    };
  }

  return {
    type: ActionTypes.GET_INDEX_BOOKS_COMPLETE,
    payload: {
      books,
    },
  };
}
