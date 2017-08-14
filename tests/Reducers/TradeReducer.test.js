import TradeReducer from "../../src/Reducers/TradeReducer";

describe("TradeReducer", () => {
  const defaultState = {
    userTrades: [],
    tradeById: null,
    tradeErr: null,
    messages: [],
    messageErr: null
  };
  it("should return the initial state", () => {
    const expectedState = defaultState;
    const state = TradeReducer(undefined, {});
    expect(state).toEqual(expectedState);
  });

  it("should handle successful GET_USER_TRADES_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeErr: new Error()
    });
    const trades = [{ id: 1 }, { id: 2 }];
    const action = {
      type: "GET_USER_TRADES_COMPLETE",
      payload: {
        trades
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      userTrades: trades
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure GET_USER_TRADES_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      userTrades: [{ id: 1 }, { id: 2 }]
    });
    const error = new Error();
    const action = {
      type: "GET_USER_TRADES_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      tradeErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful GET_TRADE_BY_ID_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeErr: new Error()
    });
    const trade = { id: 1 };
    const action = {
      type: "GET_TRADE_BY_ID_COMPLETE",
      payload: {
        trade
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      tradeById: trade
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure GET_TRADE_BY_ID_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeById: { id: 1 }
    });
    const error = new Error();
    const action = {
      type: "GET_TRADE_BY_ID_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      tradeErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful GET_TRADE_MESSAGES_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      messageErr: new Error()
    });
    const messages = [{ id: "1" }, { id: "2" }];
    const action = {
      type: "GET_TRADE_MESSAGES_COMPLETE",
      payload: {
        messages
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      messages
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure GET_TRADE_MESSAGES_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      messages: [{ id: "1" }, { id: "2" }]
    });
    const error = new Error();
    const action = {
      type: "GET_TRADE_MESSAGES_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      messageErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful SEND_TRADE_MESSAGE_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      messages: [{ id: "1" }, { id: "2" }],
      messageErr: new Error()
    });
    const message = { id: "3" };
    const action = {
      type: "SEND_TRADE_MESSAGE_COMPLETE",
      payload: {
        message
      }
    };
    const expectedMessages = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const expectedState = Object.assign({}, defaultState, {
      messages: expectedMessages
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure GET_TRADE_MESSAGES_COMPLETE", () => {
    const initialState = defaultState;
    const error = new Error();
    const action = {
      type: "SEND_TRADE_MESSAGE_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      messageErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful ACCEPT_TRADE_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeErr: new Error()
    });
    const action = {
      type: "ACCEPT_TRADE_COMPLETE",
      payload: {}
    };
    const expectedState = defaultState;
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure ACCEPT_TRADE_COMPLETE", () => {
    const initialState = defaultState;
    const error = new Error();
    const action = {
      type: "ACCEPT_TRADE_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      tradeErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle successful CANCEL_TRADE_COMPLETE", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeErr: new Error()
    });
    const action = {
      type: "CANCEL_TRADE_COMPLETE",
      payload: {}
    };
    const expectedState = defaultState;
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle failure CANCEL_TRADE_COMPLETE", () => {
    const initialState = defaultState;
    const error = new Error();
    const action = {
      type: "CANCEL_TRADE_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = Object.assign({}, defaultState, {
      tradeErr: error
    });
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle TRADE_RESET_ERRORS", () => {
    const initialState = Object.assign({}, defaultState, {
      tradeErr: new Error()
    });
    const action = {
      type: "TRADE_RESET_ERRORS",
      payload: {}
    };
    const expectedState = defaultState;
    const state = TradeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
