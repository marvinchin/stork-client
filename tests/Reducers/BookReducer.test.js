import BookReducer from '../../src/Reducers/BookReducer';

describe('BookReducer', () => {
  const initialState = {
    genres: [],
    indexBooks: [],
  };

  it('should return correct initial state', () => {
    expect(BookReducer(undefined, {})).toEqual(initialState);
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
