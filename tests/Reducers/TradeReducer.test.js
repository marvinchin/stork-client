import TradeReducer from '../../src/Reducers/TradeReducer';

describe('TradeReducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      userTrades: [],
      tradeErr: null,
    };
    const state = TradeReducer(undefined, {});
    expect(state).toEqual(expectedState);
  });

  it('should handle successful GET_USER_TRADES_COMPLETE', () => {
    const initialError = new Error();
    const initialState = {
      userTrades: [],
      tradeErr: initialError,
    };
    const trades = [
      { id: 1 },
      { id: 2 },
    ];
    const action = {
      type: 'GET_USER_TRADES_COMPLETE',
      payload: {
        trades,
      },
    };
    const expectedState = {
      userTrades: trades,
      tradeErr: null,
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle failure GET_USER_TRADES_COMPLETE', () => {
    const initialState = {
      userTrades: [
        { id: 1 },
        { id: 2 },
      ],
      tradeErr: null,
    };
    const error = new Error();
    const action = {
      type: 'GET_USER_TRADES_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };
    const expectedState = {
      userTrades: [],
      tradeErr: error,
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
