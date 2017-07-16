import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';

import {
  handleGetUserTrades,
  handleCreateTrade,
  handleCreateTradeComplete,
  handleCancelTrade,
} from '../../src/Sagas/TradeSagas';
import { getUserTrades, createTrade, cancelTrade } from '../../src/Apis';

describe('HandleGetUserTrades', () => {
  const action = {
    type: 'GET_USER_TRADES_PENDING',
    payload: {},
  };

  const gen = cloneableGenerator(handleGetUserTrades)(action);
  let genFail;
  let genNotLoggedIn;
  let genBadGet;

  it('should call getUserTrades with correct params', () => {
    const expectedCall = call(getUserTrades);

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

      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe('HandleCreateTrade', () => {
  const book = '1';
  const offer = ['2', '3'];
  const description = 'Hello World';
  const action = {
    type: 'CREATE_TRADE_PENDING',
    payload: {
      book,
      offer,
      description,
    },
  };

  const gen = cloneableGenerator(handleCreateTrade)(action);
  let genFail;
  let genBadCreate;

  it('should call createTrade with correct params', () => {
    const expectedCall = call(createTrade, book, offer, description);

    expect(gen.next().value).toEqual(expectedCall);

    genFail = gen.clone();
    genBadCreate = gen.clone();
  });

  describe('Request Success', () => {
    describe('Create Success', () => {
      const status = 200;
      const res = {
        status,
      };

      it('should put a successful CREATE_TRADE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'CREATE_TRADE_COMPLETE',
          payload: {},
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Bad Create', () => {
      const status = 403;
      const error = 'Not Logged In';
      const res = {
        status,
        body: {
          error,
        },
      };

      it('should put a failure CREATE_TRADE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'CREATE_TRADE_COMPLETE',
          error: true,
          payload: {
            error: expect.anything(),
          },
        });

        expect(genBadCreate.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(genBadCreate.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();

    it('should put a faulure CREATE_TRADE_COMPLETE action', () => {
      const expectedPut = put({
        type: 'CREATE_TRADE_COMPLETE',
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


describe('HandleCreateTradeComplete', () => {
  describe('Success', () => {
    const action = {
      type: 'CREATE_TRADE_COMPLETE',
      payload: {},
    };

    const gen = handleCreateTradeComplete(action);

    it('should direct user to inbox page', () => {
      const route = '/inbox';
      const expectedPut = put({
        type: 'ROUTE_CHANGE_PENDING',
        payload: {
          route,
        },
      });
      expect(gen.next().value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    const action = {
      type: 'CREATE_TRADE_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };

    const gen = handleCreateTradeComplete(action);

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });
});

describe('HandleCancelTrade', () => {
  const bookId = '123';
  const action = {
    type: 'CANCEL_TRADE_PENDING',
    payload: {
      bookId,
    },
  };

  const gen = cloneableGenerator(handleCancelTrade)(action);
  let genFail;
  let genBadCancel;

  it('should call cancelTrade with correct params', () => {
    const expectedCall = call(cancelTrade, bookId);

    expect(gen.next().value).toEqual(expectedCall);

    genFail = gen.clone();
    genBadCancel = gen.clone();
  });

  describe('Request Success', () => {
    describe('Create Success', () => {
      const status = 200;
      const res = {
        status,
      };

      it('should put a successful CANCEL_TRADE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'CANCEL_TRADE_COMPLETE',
          payload: {},
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Bad Cancel', () => {
      const status = 403;
      const error = 'Not Logged In';
      const res = {
        status,
        body: {
          error,
        },
      };

      it('should put a failure CANCEL_TRADE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'CANCEL_TRADE_COMPLETE',
          error: true,
          payload: {
            error: expect.anything(),
          },
        });

        expect(genBadCancel.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(genBadCancel.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();

    it('should put a faulure CANCEL_TRADE_COMPLETE action', () => {
      const expectedPut = put({
        type: 'CANCEL_TRADE_COMPLETE',
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
