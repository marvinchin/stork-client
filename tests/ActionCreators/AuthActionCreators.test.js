import { loginUser, loginUserComplete, updateUser } from '../../src/ActionCreators/AuthActionCreators';

describe('Login User', () => {
  const username = 'test_user';
  const password = 'test_pass';
  const action = loginUser(username, password);
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
    const action = loginUserComplete(status);
    it('action should have type AUTH_LOGIN_USER_COMPLETE', () => {
      expect(action.type).toEqual('AUTH_USER_LOGIN_COMPLETE');
    });

    it('action should not have error', () => {
      expect(action.error).not.toBeDefined();
    });

    it('action payload should contain username, password, expiry', () => {
      expect(action.payload).toEqual({ status });
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = loginUserComplete(null, error);
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
  const action = updateUser(user);
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
