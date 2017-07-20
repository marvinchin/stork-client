import {
  getUserTrades,
  getUserTradesComplete,
  getTradeById,
  getTradeByIdComplete,
  createTrade,
  createTradeComplete,
  acceptTrade,
  acceptTradeComplete,
  cancelTrade,
  cancelTradeComplete,
  resetTradeErrors
} from "../../src/ActionCreators/TradeActionCreators";

describe("Get User Trades", () => {
  it("should create a GET_USER_TRADES_PENDING action", () => {
    const expectedAction = {
      type: "GET_USER_TRADES_PENDING",
      payload: {}
    };
    const action = getUserTrades();
    expect(action).toEqual(expectedAction);
  });
});

describe("Get User Trades Complete", () => {
  describe("Success", () => {
    const trades = [{ id: 1 }, { id: 2 }];
    it("should create a successful GET_USER_TRADES_COMPLETE action", () => {
      const expectedAction = {
        type: "GET_USER_TRADES_COMPLETE",
        payload: {
          trades
        }
      };
      const action = getUserTradesComplete(null, trades);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should create a failure GET_USER_TRADES_COMPLETE action", () => {
      const expectedAction = {
        type: "GET_USER_TRADES_COMPLETE",
        error: true,
        payload: {
          error
        }
      };
      const action = getUserTradesComplete(error, null);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Get Trade By Id", () => {
  const tradeId = "123";

  it("should create a GET_TRADE_BY_ID_PENDING action", () => {
    const expectedAction = {
      type: "GET_TRADE_BY_ID_PENDING",
      payload: {
        tradeId
      }
    };
    const action = getTradeById(tradeId);
    expect(action).toEqual(expectedAction);
  });
});

describe("Get Trade By Id Complete", () => {
  describe("Success", () => {
    const trade = { id: "123" };
    it("should create a successful GET_TRADE_BY_ID_COMPLETE action", () => {
      const expectedAction = {
        type: "GET_TRADE_BY_ID_COMPLETE",
        payload: {
          trade
        }
      };
      const action = getTradeByIdComplete(null, trade);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should create a failure GET_TRADE_BY_ID_COMPLETE action", () => {
      const expectedAction = {
        type: "GET_TRADE_BY_ID_COMPLETE",
        error: true,
        payload: {
          error
        }
      };
      const action = getTradeByIdComplete(error, null);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Create Trade", () => {
  const bookId = "1";
  const offer = ["2", "3"];
  const description = "Hello World";

  it("should create a CREATE_TRADE_PENDING action", () => {
    const expectedAction = {
      type: "CREATE_TRADE_PENDING",
      payload: {
        book: bookId,
        offer,
        description
      }
    };
    const action = createTrade(bookId, offer, description);
    expect(action).toEqual(expectedAction);
  });
});

describe("Create Trade Complete", () => {
  describe("Success", () => {
    it("should create a successful CREATE_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "CREATE_TRADE_COMPLETE",
        payload: {}
      };
      const action = createTradeComplete(null);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should create a failure CREATE_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "CREATE_TRADE_COMPLETE",
        error: true,
        payload: {
          error: expect.anything()
        }
      };
      const action = createTradeComplete(error);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Cancel Trade", () => {
  const trade = "123";
  it("should create a CANCEL_TRADE_PENDING action", () => {
    const expectedAction = {
      type: "CANCEL_TRADE_PENDING",
      payload: {
        trade
      }
    };
    const action = cancelTrade(trade);
    expect(action).toEqual(expectedAction);
  });
});

describe("Cancel Trade Complete", () => {
  describe("Success", () => {
    it("should create successful CANCEL_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "CANCEL_TRADE_COMPLETE",
        payload: {}
      };
      const action = cancelTradeComplete(null);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should create failure CANCEL_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "CANCEL_TRADE_COMPLETE",
        error: true,
        payload: {
          error
        }
      };
      const action = cancelTradeComplete(error);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Accept Trade", () => {
  const trade = "123";
  const selection = "321";
  it("should create a ACCEPT_TRADE_PENDING action", () => {
    const expectedAction = {
      type: "ACCEPT_TRADE_PENDING",
      payload: {
        trade,
        selection
      }
    };
    const action = acceptTrade(trade, selection);
    expect(action).toEqual(expectedAction);
  });
});

describe("Accept Trade Complete", () => {
  describe("Success", () => {
    it("should create a successful ACCEPT_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "ACCEPT_TRADE_COMPLETE",
        payload: {}
      };
      const action = acceptTradeComplete(null);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should create a failure ACCEPT_TRADE_COMPLETE action", () => {
      const expectedAction = {
        type: "ACCEPT_TRADE_COMPLETE",
        error: true,
        payload: {
          error: expect.anything()
        }
      };
      const action = acceptTradeComplete(error);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Reset Trade Errors", () => {
  it("should create a TRADE_RESET_ERRORS action", () => {
    const expectedAction = {
      type: "TRADE_RESET_ERRORS",
      payload: {}
    };
    const action = resetTradeErrors();
    expect(action).toEqual(expectedAction);
  });
});
