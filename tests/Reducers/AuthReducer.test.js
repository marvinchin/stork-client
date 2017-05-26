import AuthReducer from '../../src/Reducers/AuthReducer';

describe('AuthReducer', () => {
  it('should return the initial state', () => {
    const expectedState = null;
    expect(AuthReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle AUTH_UPDATE_USER_PENDING', () => {
    const initialState = null;
    const user = 'test_user';
    const action = {
      type: 'AUTH_UPDATE_USER_PENDING',
      payload: {
        user,
      },
    };
    const expectedState = user;
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });
});
