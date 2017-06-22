import { createBook, createBookComplete } from '../../src/ActionCreators/BookActionCreators';

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
  })
});
