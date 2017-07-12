import {
  authenticateUser,
  authenticateUserComplete,
  loginUser,
  loginUserComplete,
  updateUser,
  registerUser,
  registerUserComplete,
  resetAuthErrors,
} from '../../src/ActionCreators/AuthActionCreators';

describe('Authenticate User', () => {
  const action = authenticateUser();
  it('should create an AUTHENTICATE_USER_PENDING action', () => {
    const expectedAction = {
      type: 'AUTHENTICATE_USER_PENDING',
      payload: {},
    };
    expect(action).toEqual(expectedAction);
  });
});

describe('Authenticate User Complete', () => {
  describe('Success', () => {
    const user = {
      id: 1,
    };
    const action = authenticateUserComplete(null, user);

    it('should return successful AUTHENTICATE_USER_COMPLETE action', () => {
      const expectedAction = {
        type: 'AUTHENTICATE_USER_COMPLETE',
        payload: {
          user,
        },
      };
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = authenticateUserComplete(error);

    it('should return failure AUTHENTICATE_USER_COMPLETE action', () => {
      const expectedAction = {
        type: 'AUTHENTICATE_USER_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };

      expect(action).toEqual(expectedAction);
    });
  });
});

describe('Login User', () => {
  const username = 'test_user';
  const password = 'test_pass';
  const action = loginUser(null, username, password);
  it('action should have type AUTH_LOGIN_USER_PENDING', () => {
    expect(action.type).toEqual('AUTH_USER_LOGIN_PENDING');
  });

  it('action should not have error', () => {
    expect(action.error).not.toBeDefined();
  });

  it('action payload should contain username, password, expiry', () => {
    expect(action.payload).toEqual({ username, password });
  });
});

describe('Login User Complete', () => {
  describe('Success', () => {
    const user = { username: 'test_user' };
    const action = loginUserComplete(null, user);
    it('action should have type AUTH_LOGIN_USER_COMPLETE', () => {
      expect(action.type).toEqual('AUTH_USER_LOGIN_COMPLETE');
    });

    it('action should not have error', () => {
      expect(action.error).not.toBeDefined();
    });

    it('action payload should contain username, password, expiry', () => {
      expect(action.payload).toEqual({ user });
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = loginUserComplete(error);
    it('action should have type AUTH_LOGIN_USER_COMPLETE', () => {
      expect(action.type).toEqual('AUTH_USER_LOGIN_COMPLETE');
    });

    it('action should have error', () => {
      expect(action.error).toBe(true);
    });

    it('action payload should contain error', () => {
      expect(action.payload).toEqual({ error });
    });
  });
});

describe('Update User', () => {
  const user = {
    username: 'test_user',
  };
  const action = updateUser(null, user);
  it('action should have type AUTH_UPDATE_USER_PENDING', () => {
    expect(action.type).toEqual('AUTH_UPDATE_USER_PENDING');
  });

  it('action should not have error', () => {
    expect(action.error).not.toBeDefined();
  });

  it('action payload should contain user', () => {
    expect(action.payload).toEqual({ user });
  });
});

describe('Register User', () => {
  const username = 'test_user';
  const password = 'test_password';
  const email = 'test_email';
  it('should create an AUTH_USER_REGISTER_PENDING action', () => {
    const expectedAction = {
      type: 'AUTH_USER_REGISTER_PENDING',
      payload: {
        username,
        password,
        email,
      },
    };
    expect(registerUser(null, username, password, email)).toEqual(expectedAction);
  });
});

describe('Register User Complete', () => {
  describe('Success', () => {
    const user = {
      username: 'test_user',
    };
    it('should create a successful AUTH_USER_REGISTER_COMPLETE action', () => {
      const expectedAction = {
        type: 'AUTH_USER_REGISTER_COMPLETE',
        payload: {
          user,
        },
      };
      expect(registerUserComplete(null, user)).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create a failure AUTH_USER_REGISTER_COMPLETE action', () => {
      const expectedAction = {
        type: 'AUTH_USER_REGISTER_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };
      expect(registerUserComplete(error)).toEqual(expectedAction);
    });
  });
});

describe('Reset Auth Errors', () => {
  const expectedAction = {
    type: 'AUTH_RESET_ERRORS',
    payload: {},
  };
  expect(resetAuthErrors()).toEqual(expectedAction);
});

