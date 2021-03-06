import { cloneableGenerator } from "redux-saga/utils";
import { call, put } from "redux-saga/effects";

import {
  handleCreateBook,
  handleCreateBookComplete,
  handleGetBookById,
  handleGetGenres,
  handleGetIndexBooks,
  handleSearchBooks
} from "../../src/Sagas/BookSagas";
import {
  createBook,
  getBookById,
  getGenres,
  getIndexBooks,
  searchBooks
} from "../../src/Apis";

describe("HandleCreateBook", () => {
  const title = "The Three Little Pigs";
  const author = "Big Bad Wolf";
  const genre = "Fiction";
  const description = "Cool book";
  const action = {
    type: "BOOK_CREATE_PENDING",
    payload: {
      title,
      author,
      genre,
      description
    }
  };

  const gen = cloneableGenerator(handleCreateBook)(action);
  let genFail;
  let genBadCreate;

  it("should call createBook API with correct params", () => {
    const expectedCall = call(createBook, title, author, genre, description);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadCreate = gen.clone();
  });

  describe("Request Success", () => {
    describe("Create Success", () => {
      const status = 200;
      const res = {
        status
      };

      it("should put a successful BOOK_CREATE_COMPLETE action", () => {
        const expectedPut = put({
          type: "BOOK_CREATE_COMPLETE",
          payload: {}
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Create Failure", () => {
      const status = 400;
      const res = {
        status
      };

      it("should put a failure BOOK_CREATE_COMPLETE action", () => {
        const expectedPut = put({
          type: "BOOK_CREATE_COMPLETE",
          error: true,
          payload: {
            error: expect.anything()
          }
        });

        expect(genBadCreate.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadCreate.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();

    it("should put failure BOOK_CREATE_COMPLETE action", () => {
      const expectedPut = put({
        type: "BOOK_CREATE_COMPLETE",
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

describe("HandleCreateBookComplete", () => {
  describe("Create Book Success", () => {
    const action = {
      type: "BOOK_CREATE_COMPLETE",
      payload: {}
    };

    const gen = handleCreateBookComplete(action);

    it("should put an action to redirect user to index", () => {
      const route = "/index";
      const expectedPut = put({
        type: "ROUTE_CHANGE_PENDING",
        payload: {
          route
        }
      });

      expect(gen.next().value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Create Book Failure", () => {
    const error = new Error();
    const action = {
      type: "BOOK_CREATE_COMPLETE",
      error: true,
      payload: {
        error
      }
    };

    const gen = handleCreateBookComplete(action);

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });
});

describe("HandleGetBookById", () => {
  const bookId = "1";
  const action = {
    type: "GET_BOOK_BY_ID_PENDING",
    payload: {
      bookId
    }
  };
  const gen = cloneableGenerator(handleGetBookById)(action);
  let genFail;
  let genBadGet;

  it("should call getBookById API", () => {
    const expectedCall = call(getBookById, bookId);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadGet = gen.clone();
  });

  describe("Request Success", () => {
    describe("Get Success", () => {
      const status = 200;
      const book = { id: 1 };
      const res = {
        status,
        body: {
          book
        }
      };

      it("should put a successful GET_BOOK_BY_ID_COMPLETE action", () => {
        const expectedPut = put({
          type: "GET_BOOK_BY_ID_COMPLETE",
          payload: {
            book
          }
        });
        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Get Failure", () => {
      const status = 400;
      const res = {
        status,
        body: {
          error: new Error()
        }
      };
      it("should put failure GET_BOOK_BY_ID_COMPLETE action", () => {
        const expectedPut = put({
          type: "GET_BOOK_BY_ID_COMPLETE",
          error: true,
          payload: {
            error: expect.anything()
          }
        });

        expect(genBadGet.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadGet.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    it("should put failure GET_BOOK_BY_ID_COMPLETE action", () => {
      const expectedPut = put({
        type: "GET_BOOK_BY_ID_COMPLETE",
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

describe("HandleGetGenres", () => {
  const action = {
    type: "GET_GENRES_PENDING",
    payload: {}
  };
  const gen = cloneableGenerator(handleGetGenres)(action);
  let genFail;

  it("should call getGenres API", () => {
    const expectedCall = call(getGenres);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
  });

  describe("Success", () => {
    const status = 200;
    const body = {
      success: true,
      genres: ["Fiction", "Non-Fiction"]
    };
    const res = { status, body };

    it("should put a successful GET_GENRES_COMPLETE action", () => {
      const expectedPut = put({
        type: "GET_GENRES_COMPLETE",
        payload: {
          genres: body.genres
        }
      });
      expect(gen.next(res).value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should put failure GET_GENRES_COMPLETE action", () => {
      const expectedPut = put({
        type: "GET_GENRES_COMPLETE",
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

describe("HandleGetIndexBooks", () => {
  const action = {
    type: "GET_INDEX_BOOKS_PENDING",
    payload: {}
  };
  const gen = cloneableGenerator(handleGetIndexBooks)(action);
  let genFail;

  it("should call getIndexBooks API", () => {
    const expectedCall = call(getIndexBooks);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
  });

  describe("Success", () => {
    const status = 200;
    const body = {
      success: true,
      books: [{ id: 1 }, { id: 2 }]
    };

    const res = { status, body };

    it("should put a successful GET_INDEX_BOOKS_COMPLETE action", () => {
      const expectedPut = put({
        type: "GET_INDEX_BOOKS_COMPLETE",
        payload: {
          books: body.books
        }
      });
      expect(gen.next(res).value).toEqual(expectedPut);
    });

    it("should be done", () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe("Failure", () => {
    const error = new Error();
    it("should put failure GET_INDEX_BOOKS_COMPLETE action", () => {
      const expectedPut = put({
        type: "GET_INDEX_BOOKS_COMPLETE",
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

describe("HandleSearchBooks", () => {
  const query = "Hello";
  const searchBy = "title";
  const genre = ["Non-Fiction"];
  const action = {
    type: "SEARCH_BOOKS_PENDING",
    payload: {
      query,
      searchBy,
      genre
    }
  };
  const gen = cloneableGenerator(handleSearchBooks)(action);
  let genFail;
  let genBadSearch;

  it("should call searchBooks API", () => {
    const expectedCall = call(searchBooks, query, searchBy, genre);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadSearch = gen.clone();
  });

  describe("Request Success", () => {
    describe("Search Success", () => {
      const status = 200;
      const body = {
        books: [{ id: 1 }, { id: 2 }]
      };

      const res = { status, body };

      it("should put a successful SEARCH_BOOKS_COMPLETE action", () => {
        const expectedPut = put({
          type: "SEARCH_BOOKS_COMPLETE",
          payload: {
            books: body.books
          }
        });
        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe("Search Failure", () => {
      const status = 400;
      const body = {
        error: "Invalid Genre"
      };

      const res = { status, body };

      it("should put a failure SEARCH_BOOKS_COMPLETE action", () => {
        const expectedPut = put({
          type: "SEARCH_BOOKS_COMPLETE",
          error: true,
          payload: {
            error: expect.anything()
          }
        });
        expect(genBadSearch.next(res).value).toEqual(expectedPut);
      });

      it("should be done", () => {
        expect(genBadSearch.next().done).toBe(true);
      });
    });
  });

  describe("Request Failure", () => {
    const error = new Error();
    it("should put failure SEARCH_BOOKS_COMPLETE action", () => {
      const expectedPut = put({
        type: "SEARCH_BOOKS_COMPLETE",
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
