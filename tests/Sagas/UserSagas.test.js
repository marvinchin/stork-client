import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';

import {
  handleGetUserProfile,
} from '../../src/Sagas/UserSagas';
import { getUserProfile } from '../../src/Apis';

describe('GetUserProfile', () => {
  const username = 'test_user';
  const action = {
    type: 'GET_USER_PROFILE_PENDING',
    payload: {
      username,
    },
  };

  const gen = cloneableGenerator(handleGetUserProfile)(action);
  let genFail;

  it('should call getUserProfile API with correct username', () => {
    const expectedCall = call(getUserProfile, username);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
  });

  describe('Success', () => {
    const status = 200;
    const body = {
      username: 'test_user',
    };
    const res = {
      status,
      body,
    };

    it('should put a successful GET_USER_PROFILE_COMPLETE action', () => {
      const expectedPut = put({
        type: 'GET_USER_PROFILE_COMPLETE',
        payload: {
          user: body,
        },
      });
      expect(gen.next(res).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should put failure GET_USER_PROFILE_COMPLETE action', () => {
      const expectedPut = put({
        type: 'GET_USER_PROFILE_COMPLETE',
        error: true,
        payload: {
          error: expect.anything(),
        },
      });

      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});
