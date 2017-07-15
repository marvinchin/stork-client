import {
  getUserTrades,
  getUserTradesComplete,
} from '../../src/ActionCreators/TradeActionCreators';

describe('Get User Trades', () => {
  it('should create a GET_USER_TRADES_PENDING action', () => {
    const expectedAction = {
      type: 'GET_USER_TRADES_PENDING',
      payload: {},
    };
    const action = getUserTrades();
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
