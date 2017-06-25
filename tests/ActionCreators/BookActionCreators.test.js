import {
  createBook,
  createBookComplete,
  getGenres,
  getGenresComplete,
  getIndexBooks,
  getIndexBooksComplete,
} from '../../src/ActionCreators/BookActionCreators';

describe('Create Book', () => {
  const title = 'The Three Little Pigs';
  const author = 'Big Bad Wolf';
  const genre = 'Fiction';
  const description = 'Cool book';
  it('should create a BOOK_CREATE_PENDING action with correct payload', () => {
    const expectedAction = {
      type: 'BOOK_CREATE_PENDING',
      payload: {
        title,
        author,
        genre,
        description,
      },
    };

    const action = createBook(title, author, genre, description);

    expect(action).toEqual(expectedAction);
  });

  it('should create a BOOK_CREATE_PENDING action with empty string as description if no description is provided', () => {
    const expectedAction = {
      type: 'BOOK_CREATE_PENDING',
      payload: {
        title,
        author,
        genre,
        description: '',
      },
    };

    const action = createBook(title, author, genre);

    expect(action).toEqual(expectedAction);
  });
});


describe('Create Book Complete', () => {
  describe('Success', () => {
    it('should create a successful BOOK_CREATE_COMPLETE action', () => {
      const expectedAction = {
        type: 'BOOK_CREATE_COMPLETE',
        payload: {},
      };

      const action = createBookComplete(null);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create a failure BOOK_CREATE_COMPLETE action', () => {
      const expectedAction = {
        type: 'BOOK_CREATE_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };

      const action = createBookComplete(error);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe('Get Genres', () => {
  it('should create a GET_GENRES_PENDING', () => {
    const expectedAction = {
      type: 'GET_GENRES_PENDING',
      payload: {},
    };

    const action = getGenres();

    expect(action).toEqual(expectedAction);
  });
});

describe('Get Genres Complete', () => {
  describe('Success', () => {
    const genres = [
      'Fiction',
      'Non-Fiction',
    ];

    it('should create a successful GET_GENRE_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_GENRES_COMPLETE',
        payload: {
          genres,
        },
      };

      const action = getGenresComplete(null, genres);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();

    it('should create a failure GET_GENRE_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_GENRES_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };

      const action = getGenresComplete(error, null);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe('Get Index Books', () => {
  it('should create a GET_INDEX_BOOKS_PENDING action', () => {
    const expectedAction = {
      type: 'GET_INDEX_BOOKS_PENDING',
      payload: {},
    };

    const action = getIndexBooks();

    expect(action).toEqual(expectedAction);
  });
});


describe('Get Index Books Complete', () => {
  describe('Success', () => {
    const books = [
      { id: 1 },
      { id: 2 },
    ];

    it('should create a successful GET_INDEX_BOOKS_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_INDEX_BOOKS_COMPLETE',
        payload: {
          books,
        },
      };

      const action = getIndexBooksComplete(null, books);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();

    it('should create a failure GET_INDEX_BOOKS_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_INDEX_BOOKS_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };

      const action = getIndexBooksComplete(error, null);

      expect(action).toEqual(expectedAction);
    });
  });
});
