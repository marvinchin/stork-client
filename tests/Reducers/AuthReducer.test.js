import AuthReducer from '../../src/Reducers/AuthReducer';

describe('AuthReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      user: null,
      authErr: null,
    };
    expect(AuthReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle sucessful AUTH_USER_LOGIN_COMPLETE', () => {
    const initialState = {
      user: null,
      authErr: null,
    };
    const user = 'test_user';
    const action = {
      type: 'AUTH_USER_LOGIN_COMPLETE',
      payload: {
        user,
      },
    };
    const expectedState = {
      user,
      authErr: null,
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle error AUTH_USER_LOGIN_COMPLETE', () => {
    const initialState = {
      user: null,
      authErr: null,
    };
    const authErr = new Error('Wrong Credentials');
    const action = {
      type: 'AUTH_USER_LOGIN_COMPLETE',
      error: true,
      payload: {
        error: authErr,
      },
    };
    const expectedState = {
      user: initialState.user,
      authErr,
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle AUTH_RESET_ERRORS', () => {
    const initialState = {
      user: 'Hello',
      authErr: new Error(),
    };
    const action = {
      type: 'AUTH_RESET_ERRORS',
      payload: {},
    };
    const expectedState = {
      user: initialState.user,
      authErr: null,
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });
});
