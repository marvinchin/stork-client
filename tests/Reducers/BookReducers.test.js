import BookReducer from '../../src/Reducers/BookReducers';

describe('BookReducer', () => {
  const initialState = {
    genres: [],
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
    const expectedState = {
      genres,
    };

    expect(BookReducer(initialState, action)).toEqual(expectedState);
  });
});
