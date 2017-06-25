import UserReducer from '../../src/Reducers/UserReducer';

describe('UserReducer', () => {
  const initialState = {
    user: null,
  };

  it('should return the correct initial state', () => {
    expect(UserReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_PROFILE_COMPLETE', () => {
    const user = {
      id: 1,
    };
    const action = {
      type: 'GET_USER_PROFILE_COMPLETE',
      payload: {
        user,
      },
    };
    const expectedState = Object.assign({}, initialState, { user });
    expect(UserReducer(initialState, action)).toEqual(expectedState);
  });
});
