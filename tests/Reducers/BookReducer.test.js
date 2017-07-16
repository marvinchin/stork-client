import BookReducer from '../../src/Reducers/BookReducer';

describe('BookReducer', () => {
  const initialState = {
    genres: [],
    book: null,
    indexBooks: [],
  };

  it('should return correct initial state', () => {
    expect(BookReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle successful GET_BOOK_BY_ID_COMPLETE', () => {
    const book = { id: '1' };
    const action = {
      type: 'GET_BOOK_BY_ID_COMPLETE',
      payload: {
        book,
      },
    };
    const expectedState = {
      genres: [],
      book,
      indexBooks: [],
    };

    expect(BookReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle failure GET_BOOK_BY_ID_COMPLETE', () => {
    const error = new Error();
    const action = {
      type: 'GET_BOOK_BY_ID_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };
    const expectedState = initialState;
    expect(BookReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_GENRES_COMPLETE', () => {
    const genres = [
      'Fiction',
      'Non-Fiction',
    ];
    const action = {
      type: 'GET_GENRES_COMPLETE',
      payload: {
        genres,
      },
    };
    const expectedState = Object.assign({}, initialState, { genres });

    expect(BookReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INDEX_BOOKS_COMPLETE', () => {
    const books = [
      { id: 1 },
      { id: 2 },
    ];
    const action = {
      type: 'GET_INDEX_BOOKS_COMPLETE',
      payload: {
        books,
      },
    };
    const expectedState = Object.assign({}, initialState, { indexBooks: books });
    expect(BookReducer(initialState, action)).toEqual(expectedState);
  });
});
