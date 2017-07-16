import {
  getUserTrades,
  getUserTradesComplete,
  createTrade,
  createTradeComplete,
  cancelTrade,
  cancelTradeComplete,
  resetTradeErrors,
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


describe('Create Trade', () => {
  const bookId = '1';
  const offer = ['2', '3'];
  const description = 'Hello World';

  it('should create a CREATE_TRADE_PENDING action', () => {
    const expectedAction = {
      type: 'CREATE_TRADE_PENDING',
      payload: {
        book: bookId,
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

describe('Cancel Trade', () => {
  const tradeId = '123';
  it('should create a CANCEL_TRADE_PENDING action', () => {
    const expectedAction = {
      type: 'CANCEL_TRADE_PENDING',
      payload: {
        tradeId,
      },
    };
    const action = cancelTrade(tradeId);
    expect(action).toEqual(expectedAction);
  });
});

describe('Cancel Trade Complete', () => {
  describe('Success', () => {
    it('should create successful CANCEL_TRADE_COMPLETE action', () => {
      const expectedAction = {
        type: 'CANCEL_TRADE_COMPLETE',
        payload: {},
      };
      const action = cancelTradeComplete(null);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create failure CANCEL_TRADE_COMPLETE action', () => {
      const expectedAction = {
        type: 'CANCEL_TRADE_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };
      const action = cancelTradeComplete(error);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe('Reset Trade Errors', () => {
  it('should create a TRADE_RESET_ERRORS action', () => {
    const expectedAction = {
      type: 'TRADE_RESET_ERRORS',
      payload: {},
    };
    const action = resetTradeErrors();
    expect(action).toEqual(expectedAction);
  });
});
