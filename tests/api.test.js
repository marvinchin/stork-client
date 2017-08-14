import {
  authenticateUser,
  loginUser,
  logoutUser,
  registerUser,
  createBook,
  getBookById,
  getGenres,
  getIndexBooks,
  searchBooks,
  getUserProfile,
  getUserTrades,
  getTradeById,
  createTrade,
  acceptTrade,
  cancelTrade,
  getTradeMessages,
  sendTradeMessage,
  __RewireAPI__ as RewireAPI
} from "../src/Apis";
import config from "../config";

describe("makeRequest", () => {
  const makeRequest = RewireAPI.__GetDependency__("makeRequest");
  global.fetch = jest.fn(() => {
    const res = {
      status: 200,
      body: new Promise(resolve => resolve({ key: "value" }))
    };
    return new Promise(resolve => resolve(res));
  });

  it("should call fetch with the appropriate params", () => {
    const url = "http://api.storkapp.flu.cc";
    const data = {
      hello: "world",
      key: "value"
    };
    const options = {
      method: "POST",
      data,
      useCredentials: true
    };

    const expectedUrl = url;
    const expectedParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    };

    makeRequest(url, options);

    expect(global.fetch).toBeCalledWith(expectedUrl, expectedParams);
  });

  it("should call fetch with no body if no data is provided", () => {
    const url = "http://api.storkapp.flu.cc";
    const options = {
      method: "GET"
    };

    const expectedUrl = url;
    const expectedParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    makeRequest(url, options);

    expect(global.fetch).toBeCalledWith(expectedUrl, expectedParams);
  });
});

describe("authenticateUser", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/authentication/status`;
    const expectedOptions = {
      method: "GET",
      useCredentials: true
    };

    authenticateUser();

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("loginUser", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make post request to endpoint with correct body", () => {
    const username = "test_user";
    const password = "test_pass";

    const expectedUrl = `${config.BACKEND_API_URL}/authentication/login`;
    const data = {
      username,
      password,
      expiry: config.SESSION_EXPIRY
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    loginUser(username, password);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("logoutUser", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make post request to endpoint with correct body", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/authentication/logout`;
    const expectedOptions = {
      method: "POST",
      useCredentials: true
    };

    logoutUser();

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("registerUser", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct body", () => {
    const username = "test_user";
    const password = "test_pass";
    const email = "test@example.com";
    // Defaults for gender and description for now
    const gender = "Male";
    const description = "";

    const expectedUrl = `${config.BACKEND_API_URL}/authentication/create`;
    const data = {
      username,
      password,
      email,
      gender,
      description
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    registerUser(username, password, email, gender, description);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("createBook", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct body", () => {
    const title = "The Three Little Pigs";
    const author = "Big Bad Wolf";
    const genre = "Fiction";
    const description = "Cool book";

    const expectedUrl = `${config.BACKEND_API_URL}/books/create`;
    const data = {
      title,
      author,
      genre,
      description
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    createBook(title, author, genre, description);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getBookById", () => {
  const mockMakeRequest = jest.fn();
  const bookId = "1";
  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/books/getByID/1`;
    const expectedOptions = {
      method: "GET"
    };

    getBookById(bookId);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getGenres", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/genres/list`;
    const expectedOptions = {
      method: "GET"
    };

    getGenres();

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getIndexBooks", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/books/list/${config.NUM_BOOKS_PER_LOAD}`;
    const expectedOptions = {
      method: "GET"
    };

    getIndexBooks();

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("searchBooks", () => {
  const mockMakeRequest = jest.fn();
  const query = "Hello";
  const searchBy = "title";
  const genre = ["Non-Fiction"];

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct params", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/books/search`;
    const data = {
      query,
      searchBy,
      genre
    };
    const expectedOptions = {
      method: "POST",
      data
    };

    searchBooks(query, searchBy, genre);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getUserProfile", () => {
  const mockMakeRequest = jest.fn();
  const username = "test_user";

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/users/test_user`;
    const expectedOptions = {
      method: "GET"
    };

    getUserProfile(username);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getUserTrades", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const expectedUrl = `${config.BACKEND_API_URL}/trades/list`;
    const expectedOptions = {
      method: "GET",
      useCredentials: true
    };

    getUserTrades();

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getTradeById", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const tradeId = "123";

    const expectedUrl = `${config.BACKEND_API_URL}/trades/getByID/123`;
    const expectedOptions = {
      method: "GET",
      useCredentials: true
    };

    getTradeById(tradeId);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("createTrade", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct body", () => {
    const book = "1";
    const offer = ["2", "3"];
    const description = "Hello World";

    const expectedUrl = `${config.BACKEND_API_URL}/trades/create`;
    const data = {
      book,
      offer,
      description
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    createTrade(book, offer, description);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("cancelTrade", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct body", () => {
    const trade = "123";
    const expectedUrl = `${config.BACKEND_API_URL}/trades/update`;
    const data = {
      trade,
      status: "C"
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    cancelTrade(trade);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("acceptTrade", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a post request to endpoint with correct body", () => {
    const trade = "123";
    const selection = "321";
    const expectedUrl = `${config.BACKEND_API_URL}/trades/update`;
    const data = {
      trade,
      selection,
      status: "A"
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    acceptTrade(trade, selection);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("getTradeMessages", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const tradeId = "123";

    const expectedUrl = `${config.BACKEND_API_URL}/messages/getMessagesForTrade/123`;
    const expectedOptions = {
      method: "GET",
      useCredentials: true
    };

    getTradeMessages(tradeId);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});

describe("sendTradeMessage", () => {
  const mockMakeRequest = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__("makeRequest", mockMakeRequest);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency("makeRequest");
  });

  it("should make a get request to endpoint", () => {
    const tradeId = "123";
    const content = "Hello World";

    const expectedUrl = `${config.BACKEND_API_URL}/messages/create`;
    const data = {
      trade: tradeId,
      content
    };
    const expectedOptions = {
      method: "POST",
      data,
      useCredentials: true
    };

    sendTradeMessage(tradeId, content);

    expect(mockMakeRequest).toBeCalledWith(expectedUrl, expectedOptions);
  });
});
