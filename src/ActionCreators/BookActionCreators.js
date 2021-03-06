import ActionTypes from "../constants/Actions";

export function createBook(title, author, genre, description = "") {
  return {
    type: ActionTypes.BOOK_CREATE_PENDING,
    payload: {
      title,
      author,
      genre,
      description
    }
  };
}

export function createBookComplete(error) {
  if (error) {
    return {
      type: ActionTypes.BOOK_CREATE_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.BOOK_CREATE_COMPLETE,
    payload: {}
  };
}

export function getBookById(bookId) {
  return {
    type: ActionTypes.GET_BOOK_BY_ID_PENDING,
    payload: {
      bookId
    }
  };
}

export function getBookByIdComplete(error, book) {
  if (error) {
    return {
      type: ActionTypes.GET_BOOK_BY_ID_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_BOOK_BY_ID_COMPLETE,
    payload: {
      book
    }
  };
}

export function getGenres() {
  return {
    type: ActionTypes.GET_GENRES_PENDING,
    payload: {}
  };
}

export function getGenresComplete(error, genres) {
  if (error) {
    return {
      type: ActionTypes.GET_GENRES_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_GENRES_COMPLETE,
    payload: {
      genres
    }
  };
}

export function getIndexBooks() {
  return {
    type: ActionTypes.GET_INDEX_BOOKS_PENDING,
    payload: {}
  };
}

export function getIndexBooksComplete(error, books) {
  if (error) {
    return {
      type: ActionTypes.GET_INDEX_BOOKS_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.GET_INDEX_BOOKS_COMPLETE,
    payload: {
      books
    }
  };
}

export function searchBooks(query, searchBy, genre) {
  return {
    type: ActionTypes.SEARCH_BOOKS_PENDING,
    payload: {
      query,
      searchBy,
      genre
    }
  };
}

export function searchBooksComplete(error, books) {
  if (error) {
    return {
      type: ActionTypes.SEARCH_BOOKS_COMPLETE,
      error: true,
      payload: {
        error
      }
    };
  }

  return {
    type: ActionTypes.SEARCH_BOOKS_COMPLETE,
    payload: {
      books
    }
  };
}
