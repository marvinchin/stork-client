import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';

import { handleGetUserTrades } from '../../src/Sagas/TradeSagas';
import { getUserTrades } from '../../src/Apis';

describe('HandleGetUserTrades', () => {
  const username = 'test_user';
  const action = {
    type: 'GET_USER_TRADES_PENDING',
    payload: {
      username,
    },
  };

  const gen = cloneableGenerator(handleGetUserTrades)(action);
  let genFail;
  let genNotLoggedIn;
  let genBadGet;

  it('should call getUserTrades with correct params', () => {
    const expectedCall = call(getUserTrades, username);

    expect(gen.next().value).toEqual(expectedCall);

    genFail = gen.clone();
    genNotLoggedIn = gen.clone();
    genBadGet = gen.clone();
  });

  describe('Request Success', () => {
    describe('Get Success', () => {
      const status = 200;
      const trades = [
        { id: 1 },
        { id: 2 },
      ];
      const res = {
        status,
        body: {
          trades,
        },
      };

      it('should put a successful GET_USER_TRADES_COMPLETE action', () => {
        const expectedPut = put({
          type: 'GET_USER_TRADES_COMPLETE',
          payload: {
            trades,
          },
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Not Logged In', () => {
      const status = 403;
      const res = {
        status,
      };

      it('should put a failure GET_USER_TRADES_COMPLETE action', () => {
        const expectedPut = put({
          type: 'GET_USER_TRADES_COMPLETE',
          error: true,
          payload: {
            error: expect.anything(),
          },
        });

        expect(genNotLoggedIn.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(genNotLoggedIn.next().done).toBe(true);
      });
    });

    describe('Bad Get', () => {
      const status = 400;
      const res = {
        status,
      };

      it('should put a failure GET_USER_TRADES_COMPLETE action', () => {
        const expectedPut = put({
          type: 'GET_USER_TRADES_COMPLETE',
          error: true,
          payload: {
            error: expect.anything(),
          },
        });

        expect(genBadGet.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(genBadGet.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();

    it('should put a failure GET_USER_TRADES_COMPLETE action', () => {
      const expectedPut = put({
        type: 'GET_USER_TRADES_COMPLETE',
        error: true,
        payload: {
          error: expect.anything(),
        },
      });

      expect(genFail.next(error).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});