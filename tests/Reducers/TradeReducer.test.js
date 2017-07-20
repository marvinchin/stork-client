import TradeReducer from "../../src/Reducers/TradeReducer";

describe("TradeReducer", () => {
  it("should return the initial state", () => {
    const expectedState = {
      userTrades: [],
      tradeById: null,
      tradeErr: null
    };
    const state = TradeReducer(undefined, {});
    expect(state).toEqual(expectedState);
  });

  it("should handle successful GET_USER_TRADES_COMPLETE", () => {
    const initialState = {
      userTrades: [],
      tradeById: null,
      tradeErr: new Error()
    };
    const trades = [{ id: 1 }, { id: 2 }];
    const action = {
      type: "GET_USER_TRADES_COMPLETE",
      payload: {
        trades
      }
    };
    const expectedState = {
      userTrades: trades,
      tradeById: null,
      tradeErr: null
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful GET_TRADE_BY_ID_COMPLETE", () => {
    const initialState = {
      userTrades: [],
      tradeById: null,
      tradeErr: new Error()
    };
    const trade = { id: 1 };
    const action = {
      type: "GET_TRADE_BY_ID_COMPLETE",
      payload: {
        trade
      }
    };
    const expectedState = {
      userTrades: [],
      tradeById: trade,
      tradeErr: null
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure GET_USER_TRADES_COMPLETE", () => {
    const initialState = {
      userTrades: [{ id: 1 }, { id: 2 }],
      tradeById: null,
      tradeErr: null
    };
    const error = new Error();
    const action = {
      type: "GET_USER_TRADES_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = {
      userTrades: [],
      tradeById: null,
      tradeErr: error
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle TRADE_RESET_ERRORS", () => {
    const initialState = {
      userTrades: [],
      tradeById: null,
      tradeErr: new Error()
    };
    const action = {
      type: "TRADE_RESET_ERRORS",
      payload: {}
    };
    const expectedState = {
      userTrades: [],
      tradeById: null,
      tradeErr: null
    };
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
