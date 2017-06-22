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
