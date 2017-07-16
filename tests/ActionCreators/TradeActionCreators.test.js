import {
  getUserTrades,
  getUserTradesComplete,
  createTrade,
  createTradeComplete,
} from '../../src/ActionCreators/TradeActionCreators';

describe('Get User Trades', () => {
  const username = 'test_user';
  it('should create a GET_USER_TRADES_PENDING action', () => {
    const expectedAction = {
      type: 'GET_USER_TRADES_PENDING',
      payload: {
        username,
      },
    };
    const action = getUserTrades(username);
    expect(action).toEqual(expectedAction);
  });
});

describe('Get User Trades Complete', () => {
  describe('Success', () => {
    const trades = [
      { id: 1 },
      { id: 2 },
    ];
    it('should create a successful GET_USER_TRADES_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_USER_TRADES_COMPLETE',
        payload: {
          trades,
        },
      };
      const action = getUserTradesComplete(null, trades);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create a failure GET_USER_TRADES_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_USER_TRADES_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };
      const action = getUserTradesComplete(error, null);
      expect(action).toEqual(expectedAction);
    });
  });
});


describe('Create Trade', () => {
  const bookId = '1';
  const offer = ['2', '3'];
  const description = 'Hello World';

  it('should create a CREATE_TRADE_PENDING action', () => {
    const expectedAction = {
      type: 'CREATE_TRADE_PENDING',
      payload: {
        bookId,
        offer,
        description,
      },
    };
    const action = createTrade(bookId, offer, description);
    expect(action).toEqual(expectedAction);
  });
});

describe('Create Trade Complete', () => {
  describe('Success', () => {
    it('should create a successful CREATE_TRADE_COMPLETE action',  () => {
      const expectedAction = {
        type: 'CREATE_TRADE_COMPLETE',
        payload: {},
      };
      const action = createTradeComplete(null);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create a failure CREATE_TRADE_COMPLETE action', () => {
      const expectedAction = {
        type: 'CREATE_TRADE_COMPLETE',
        error: true,
        payload: {
          error: expect.anything(),
        },
      };
      const action = createTradeComplete(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
