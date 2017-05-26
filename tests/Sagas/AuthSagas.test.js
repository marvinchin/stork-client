import { cloneableGenerator } from 'redux-saga/Utils';
import { call, put } from 'redux-saga/effects';

import { handleUserLogin } from '../../src/Sagas/AuthSagas';
import { loginUser } from '../../src/Apis';

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

  it('should call loginUser with params username and password', () => {
    const expectedCall = call(loginUser, username, password);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
  });

  describe('Success', () => {
    const status = 200;
    const res = {
      status,
    };
    const expectedPut = put({
      type: 'AUTH_USER_LOGIN_COMPLETE',
      payload: {
        status,
      },
    });
    it('should put successful action of type AUTH_USER_LOGIN_COMPLETE', () => {
      expect(gen.next(res).value).toEqual(expectedPut);
    });
  });

  describe('Failure', () => {
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
  });
});
