import AuthReducer from "../../src/Reducers/AuthReducer";

describe("AuthReducer", () => {
  it("should return the initial state", () => {
    const expectedState = {
      user: null,
      authErr: null
    };
    expect(AuthReducer(undefined, {})).toEqual(expectedState);
  });

  it("should handle sucessful AUTH_USER_LOGIN_COMPLETE", () => {
    const initialState = {
      user: null,
      authErr: null
    };
    const user = "test_user";
    const action = {
      type: "AUTH_USER_LOGIN_COMPLETE",
      payload: {
        user
      }
    };
    const expectedState = {
      user,
      authErr: null
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle error AUTH_USER_LOGIN_COMPLETE", () => {
    const initialState = {
      user: null,
      authErr: null
    };
    const authErr = new Error("Wrong Credentials");
    const action = {
      type: "AUTH_USER_LOGIN_COMPLETE",
      error: true,
      payload: {
        error: authErr
      }
    };
    const expectedState = {
      user: initialState.user,
      authErr
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle sucessful AUTH_USER_LOGOUT_COMPLETE", () => {
    const initialState = {
      user: { id: 1 },
      authErr: new Error()
    };
    const action = {
      type: "AUTH_USER_LOGOUT_COMPLETE",
      payload: {}
    };
    const expectedState = {
      user: null,
      authErr: null
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle error AUTH_USER_LOGOUT_COMPLETE", () => {
    const initialState = {
      user: { id: 1 },
      authErr: null
    };
    const action = {
      type: "AUTH_USER_LOGOUT_COMPLETE",
      error: true,
      payload: {
        error: new Error()
      }
    };
    const expectedState = {
      user: initialState.user,
      authErr: expect.anything()
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle successful AUTH_USER_REGISTER_COMPLETE", () => {
    const initialState = {
      user: null,
      authErr: null
    };
    const action = {
      type: "AUTH_USER_REGISTER_COMPLETE",
      payload: {}
    };
    const expectedState = initialState;
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle error AUTH_USER_REGISTER_COMPLETE", () => {
    const initialState = {
      user: null,
      authErr: null
    };
    const authErr = new Error("Duplicate Email");
    const action = {
      type: "AUTH_USER_REGISTER_COMPLETE",
      error: true,
      payload: {
        error: authErr
      }
    };
    const expectedState = {
      user: null,
      authErr
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle successful AUTHENTICATE_USER_COMPLETE", () => {
    const initialState = {
      user: null,
      authErr: new Error()
    };
    const user = { id: 1 };
    const action = {
      type: "AUTHENTICATE_USER_COMPLETE",
      payload: {
        user
      }
    };
    const expectedState = {
      user,
      authErr: null
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle failure AUTHENTICATE_USER_COMPLETE", () => {
    const initialState = {
      user: { id: 1 },
      authErr: null
    };
    const error = new Error();
    const action = {
      type: "AUTHENTICATE_USER_COMPLETE",
      error: true,
      payload: {
        error
      }
    };
    const expectedState = {
      user: null,
      authErr: error
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle AUTH_RESET_ERRORS", () => {
    const initialState = {
      user: "Hello",
      authErr: new Error()
    };
    const action = {
      type: "AUTH_RESET_ERRORS",
      payload: {}
    };
    const expectedState = {
      user: initialState.user,
      authErr: null
    };
    expect(AuthReducer(initialState, action)).toEqual(expectedState);
  });
});
