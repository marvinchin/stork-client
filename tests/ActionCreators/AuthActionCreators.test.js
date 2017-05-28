import {
  loginUser,
  loginUserComplete,
  updateUser,
  registerUser,
  registerUserComplete,
} from '../../src/ActionCreators/AuthActionCreators';

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
    const status = 200;
    const user = { username: 'test_user' };
    const action = loginUserComplete(null, user, status);
    it('action should have type AUTH_LOGIN_USER_COMPLETE', () => {
      expect(action.type).toEqual('AUTH_USER_LOGIN_COMPLETE');
    });

    it('action should not have error', () => {
      expect(action.error).not.toBeDefined();
    });

    it('action payload should contain username, password, expiry', () => {
      expect(action.payload).toEqual({ user, status });
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
