import { cloneableGenerator } from 'redux-saga/Utils';
import { call, put } from 'redux-saga/effects';

import { handleUserLogin, handleUserLoginComplete, handleUserRegister, handleUserRegisterComplete } from '../../src/Sagas/AuthSagas';
import { loginUser, registerUser } from '../../src/Apis';

describe('HandleUserLogin', () => {
  const username = 'test_user';
  const password = 'test_pass';
  const action = {
    type: 'AUTH_USER_LOGIN_PENDING',
    payload: {
      username,
      password,
    },
  };

  const gen = cloneableGenerator(handleUserLogin)(action);
  let genFail;
  let genBadLogin;

  it('should call loginUser with params username and password', () => {
    const expectedCall = call(loginUser, username, password);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadLogin = gen.clone();
  });

  describe('Request Success', () => {
    describe('Successful Login', () => {
      const status = 200;
      const user = {
        username: 'test_user',
      };
      const res = {
        status,
      };
      const expectedPut = put({
        type: 'AUTH_USER_LOGIN_COMPLETE',
        payload: {
          status,
          user,
        },
      });
      it('should put successful action of type AUTH_USER_LOGIN_COMPLETE', () => {
        expect(gen.next(res).value).toEqual(expectedPut);
      });
      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Bad Login', () => {
      const status = 400;
      const res = {
        status,
      };
      const error = new Error('Unable to login with credentials');
      const expectedPut = put({
        type: 'AUTH_USER_LOGIN_COMPLETE',
        error: true,
        payload: {
          error,
        },
      });
      it('should put error action of type AUTH_USER_LOGIN_COMPLETE', () => {
        expect(genBadLogin.next(res).value).toEqual(expectedPut);
      });
      it('should be done', () => {
        expect(genBadLogin.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();
    const expectedPut = put({
      type: 'AUTH_USER_LOGIN_COMPLETE',
      error: true,
      payload: {
        error,
      },
    });
    it('should put error action of type AUTH_USER_LOGIN_COMPLETE', () => {
      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe('handleUserLoginComplete', () => {
  describe('Success', () => {
    const user = {
      username: 'test_user',
    };
    const action = {
      type: 'AUTH_USER_LOGIN_COMPLETE',
      payload: {
        user,
      },
    };
    const gen = handleUserLoginComplete(action);

    it('should put action of type AUTH_UPDATE_USER_PENDING', () => {
      const expectedAction = {
        type: 'AUTH_UPDATE_USER_PENDING',
        payload: {
          user,
        },
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it('should put action of type ROUTE_CHANGE_PENDING', () => {
      const route = '/';
      const expectedAction = {
        type: 'ROUTE_CHANGE_PENDING',
        payload: {
          route,
        },
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = {
      type: 'AUTH_USER_LOGIN_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };

    const gen = handleUserLoginComplete(action);
    it('should not carry out any action and be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });
});

describe('handleUserRegister', () => {
  const username = 'test_user';
  const password = 'test_password';
  const email = 'test@example.com';
  const action = {
    type: 'AUTH_USER_REGISTER_PENDING',
    payload: {
      username,
      password,
      email,
    },
  };
  const gen = cloneableGenerator(handleUserRegister)(action);
  let genFail;
  let genBadRegister;

  it('should call registerUser with params username, password, and email', () => {
    const expectedCall = call(registerUser, username, password, email);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadRegister = gen.clone();
  });

  describe('Request Success', () => {
    describe('Successful Register', () => {
      const status = 200;
      const user = {
        username: 'test_user',
      };
      const res = {
        status,
      };
      it('should put a successful AUTH_USER_REGISTER_COMPLETE action', () => {
        const expectedPut = put({
          type: 'AUTH_USER_REGISTER_COMPLETE',
          payload: {
            user,
          },
        });
        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Bad Register', () => {
      const status = 400;
      const res = {
        status,
      };
      it('should put a failure AUTH_USER_REGISTER_COMPLETE action', () => {
        const error = new Error('Unable to register user');
        const expectedPut = put({
          type: 'AUTH_USER_REGISTER_COMPLETE',
          error: true,
          payload: {
            error,
          },
        });
        expect(genBadRegister.next(res).value).toEqual(expectedPut);
      });
      it('should be done', () => {
        expect(genBadRegister.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();
    const expectedPut = put({
      type: 'AUTH_USER_REGISTER_COMPLETE',
      error: true,
      payload: {
        error,
      },
    });
    it('should put a failure AUTH_USER_REGISTER_COMPLETE action', () => {
      expect(genFail.throw(error).value).toEqual(expectedPut);
    });
    it('should be done', () => {
      expect(genBadRegister.next().done).toBe(true);
    });
  });
});

describe('handleUserRegisterComplete', () => {
  describe('Success', () => {
    const action = {
      type: 'AUTH_USER_REGISTER_COMPLETE',
      payload: {},
    };

    const gen = handleUserRegisterComplete(action);

    it('should redirect user to homepage', () => {
      const route = '/';
      const expectedAction = {
        type: 'ROUTE_CHANGE_PENDING',
        payload: {
          route,
        },
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = {
      type: 'AUTH_USER_REGISTER_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };

    const gen = handleUserRegisterComplete(action);

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });
});
