import { cloneableGenerator } from "redux-saga/utils";
import { call, put } from "redux-saga/effects";

import {
  handleUserLogin,
  handleUserLoginComplete,
  handleUserLogout,
  handleUserLogoutComplete,
  handleUserRegister,
  handleUserRegisterComplete,
  handleAuthenticateUser
} from "../../src/Sagas/AuthSagas";
import {
  loginUser,
  logoutUser,
  registerUser,
  authenticateUser
} from "../../src/Apis";

describe("AuthenticateUser", () => {
  const action = {
    type: "AUTHENTICATE_USER_PENDING",
    payload: {}
  };

  const gen = cloneableGenerator(handleAuthenticateUser)(action);
  let genFail;
  let genBadAuth;

  it("should reset the stored user", () => {
    const expectedAction = {
      type: "AUTH_UPDATE_USER_PENDING",
      payload: {
        user: null
      }
    };
    expect(gen.next().value).toEqual(put(expectedAction));
  });

  it("should call authenticateUser", () => {
    const expectedCall = call(authenticateUser);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadAuth = gen.clone();
  });

  describe("Request Success", () => {
    describe("Auth Success", () => {
      const status = 200;
      const body = {
        authenticated: true,
        user: {
          id: 1
        }
      };
      const res = {
        status,
        body
      };

      it("should put action of type AUTH_UPDATE_USER_PENDING", () => {
        const expectedAction = {
          type: "AUTH_UPDATE_USER_PENDING",
          payload: {
            user: body.user
          }
        };
        expect(gen.next(res).value).toEqual(put(expectedAction));
      });

      it("should put successful AUTHENTICATE_USER_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTHENTICATE_USER_COMPLETE",
          payload: {
            user: body.user
          }
        });
        expect(gen.next().value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Auth Failure", () => {
      const status = 200;
      const body = {
        authenticated: false
      };
      const res = {
        status,
        body
      };

      it("should put failure AUTHENTICATE_USER_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTHENTICATE_USER_COMPLETE",
          error: true,
          payload: {
            error: expect.anything()
          }
        });

        expect(genBadAuth.next(res).value).toEqual(expectedPut);
      });

      it("should redirect user to login page", () => {
        const route = "/login";
        const expectedPut = put({
          type: "ROUTE_CHANGE_PENDING",
          payload: {
            route
          }
        });
        expect(genBadAuth.next().value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadAuth.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    it("should put failure AUTHENTICATE_USER_COMPLETE action", () => {
      const expectedPut = put({
        type: "AUTHENTICATE_USER_COMPLETE",
        error: true,
        payload: {
          error: expect.anything()
        }
      });

      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it("should redirect user to login page", () => {
      const route = "/login";
      const expectedPut = put({
        type: "ROUTE_CHANGE_PENDING",
        payload: {
          route
        }
      });
      expect(genFail.next().value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe("HandleUserLogin", () => {
  const username = "test_user";
  const password = "test_pass";
  const action = {
    type: "AUTH_USER_LOGIN_PENDING",
    payload: {
      username,
      password
    }
  };

  const gen = cloneableGenerator(handleUserLogin)(action);
  let genFail;
  let genBadLogin;

  it("should call loginUser with params username and password", () => {
    const expectedCall = call(loginUser, username, password);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadLogin = gen.clone();
  });

  describe("Request Success", () => {
    describe("Successful Login", () => {
      const status = 200;
      const body = {
        user: {
          username: "test_user"
        }
      };
      const res = {
        status,
        body
      };
      it("should put successful AUTH_USER_LOGIN_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTH_USER_LOGIN_COMPLETE",
          payload: {
            user: body.user
          }
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Bad Login", () => {
      const status = 400;
      const res = {
        status
      };
      const error = new Error("Unable to login with credentials");
      it("should put a failure AUTH_USER_LOGIN_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTH_USER_LOGIN_COMPLETE",
          error: true,
          payload: {
            error
          }
        });

        expect(genBadLogin.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadLogin.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    it("should put error action of type AUTH_USER_LOGIN_COMPLETE", () => {
      const expectedPut = put({
        type: "AUTH_USER_LOGIN_COMPLETE",
        error: true,
        payload: {
          error
        }
      });
      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe("handleUserLoginComplete", () => {
  describe("Success", () => {
    const user = {
      username: "test_user"
    };
    const action = {
      type: "AUTH_USER_LOGIN_COMPLETE",
      payload: {
        user
      }
    };
    const gen = handleUserLoginComplete(action);

    it("should put action of type ROUTE_CHANGE_PENDING", () => {
      const route = "/index";
      const expectedAction = {
        type: "ROUTE_CHANGE_PENDING",
        payload: {
          route
        }
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    const action = {
      type: "AUTH_USER_LOGIN_COMPLETE",
      error: true,
      payload: {
        error
      }
    };

    const gen = handleUserLoginComplete(action);
    it("should not carry out any action and be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });
});

describe("HandleUserLogout", () => {
  const action = {
    type: "AUTH_USER_LOGOUT_PENDING",
    payload: {}
  };

  const gen = cloneableGenerator(handleUserLogout)(action);
  let genFail;
  let genBadLogout;

  it("should call logoutUser", () => {
    const expectedCall = call(logoutUser);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadLogout = gen.clone();
  });

  describe("Request Success", () => {
    describe("Successful Login", () => {
      const status = 200;
      const res = {
        status
      };
      it("should put successful AUTH_USER_LOGOUT_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTH_USER_LOGOUT_COMPLETE",
          payload: {}
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Bad Logout", () => {
      const status = 400;
      const res = {
        status,
        body: {
          error: "Not Logged In"
        }
      };
      it("should put a failure AUTH_USER_LOGOUT_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTH_USER_LOGOUT_COMPLETE",
          error: true,
          payload: {
            error: expect.anything()
          }
        });

        expect(genBadLogout.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadLogout.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    it("should put error action of type AUTH_USER_LOGOUT_COMPLETE", () => {
      const expectedPut = put({
        type: "AUTH_USER_LOGOUT_COMPLETE",
        error: true,
        payload: {
          error: expect.anything()
        }
      });
      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe("handleUserLogoutComplete", () => {
  describe("Success", () => {
    const action = {
      type: "AUTH_USER_LOGOUT_COMPLETE",
      payload: {}
    };
    const gen = handleUserLogoutComplete(action);

    it("should put action of type ROUTE_CHANGE_PENDING", () => {
      const route = "/";
      const expectedAction = {
        type: "ROUTE_CHANGE_PENDING",
        payload: {
          route
        }
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    const action = {
      type: "AUTH_USER_LOGOUT_COMPLETE",
      error: true,
      payload: {
        error
      }
    };

    const gen = handleUserLogoutComplete(action);
    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });
});

describe("handleUserRegister", () => {
  const username = "test_user";
  const password = "test_password";
  const email = "test@example.com";
  const action = {
    type: "AUTH_USER_REGISTER_PENDING",
    payload: {
      username,
      password,
      email
    }
  };
  const gen = cloneableGenerator(handleUserRegister)(action);
  let genFail;
  let genBadRegister;

  it("should call registerUser with params username, password, and email", () => {
    const expectedCall = call(registerUser, username, password, email);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadRegister = gen.clone();
  });

  describe("Request Success", () => {
    describe("Successful Register", () => {
      const status = 200;
      const body = {
        user: {
          username: "test_user"
        }
      };
      const res = {
        status,
        body
      };
      it("should put a successful AUTH_USER_REGISTER_COMPLETE action", () => {
        const expectedPut = put({
          type: "AUTH_USER_REGISTER_COMPLETE",
          payload: {
            user: body.user
          }
        });
        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Bad Register", () => {
      const status = 400;
      const body = {
        error: "Unable to register user"
      };
      const res = {
        status,
        body
      };
      it("should put a failure AUTH_USER_REGISTER_COMPLETE action", () => {
        const error = new Error(body.error);
        const expectedPut = put({
          type: "AUTH_USER_REGISTER_COMPLETE",
          error: true,
          payload: {
            error
          }
        });
        expect(genBadRegister.next(res).value).toEqual(expectedPut);
      });
      it("should be done", () => {
        expect(genBadRegister.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    const expectedPut = put({
      type: "AUTH_USER_REGISTER_COMPLETE",
      error: true,
      payload: {
        error
      }
    });
    it("should put a failure AUTH_USER_REGISTER_COMPLETE action", () => {
      expect(genFail.throw(error).value).toEqual(expectedPut);
    });
    it("should be done", () => {
      expect(genBadRegister.next().done).toBe(true);
    });
  });
});

describe("handleUserRegisterComplete", () => {
  describe("Success", () => {
    const action = {
      type: "AUTH_USER_REGISTER_COMPLETE",
      payload: {}
    };

    const gen = handleUserRegisterComplete(action);

    it("should redirect user to login page", () => {
      const route = "/login";
      const expectedAction = {
        type: "ROUTE_CHANGE_PENDING",
        payload: {
          route
        }
      };
      expect(gen.next().value).toEqual(put(expectedAction));
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    const action = {
      type: "AUTH_USER_REGISTER_COMPLETE",
      error: true,
      payload: {
        error
      }
    };

    const gen = handleUserRegisterComplete(action);

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });
});
