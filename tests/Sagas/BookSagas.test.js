import { cloneableGenerator } from 'redux-saga/Utils';
import { call, put } from 'redux-saga/effects';

import { handleCreateBook, handleCreateBookComplete } from '../../src/Sagas/BookSagas';
import { createBook } from '../../src/Apis';

describe('HandleCreateBook', () => {
  const title = 'The Three Little Pigs';
  const author = 'Big Bad Wolf';
  const genre = 'Fiction';
  const description = 'Cool book';
  const action = {
    type: 'BOOK_CREATE_PENDING',
    payload: {
      title,
      author,
      genre,
      description,
    },
  };

  const gen = cloneableGenerator(handleCreateBook)(action);
  let genFail;
  let genBadCreate;

  it('should call createBook API with correct params', () => {
    const expectedCall = call(createBook, title, author, genre, description);
    expect(gen.next().value).toEqual(expectedCall);
    genFail = gen.clone();
    genBadCreate = gen.clone();
  });

  describe('Request Success', () => {
    describe('Create Success', () => {
      const status = 200;
      const res = {
        status,
      };

      it('should put a successful BOOK_CREATE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'BOOK_CREATE_COMPLETE',
          payload: {},
        });

        expect(gen.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(gen.next().done).toBe(true);
      });
    });

    describe('Create Failure', () => {
      const status = 400;
      const res = {
        status,
      };

      it('should put a failure BOOK_CREATE_COMPLETE action', () => {
        const expectedPut = put({
          type: 'BOOK_CREATE_COMPLETE',
          error: true,
          payload: {
            error: expect.anything(),
          },
        });

        expect(genBadCreate.next(res).value).toEqual(expectedPut);
      });

      it('should be done', () => {
        expect(genBadCreate.next().done).toBe(true);
      });
    });
  });

  describe('Request Failure', () => {
    const error = new Error();

    it('should put failure BOOK_CREATE_COMPLETE action', () => {
      const expectedPut = put({
        type: 'BOOK_CREATE_COMPLETE',
        error: true,
        payload: {
          error: expect.anything(),
        },
      });

      expect(genFail.throw(error).value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(genFail.next().done).toBe(true);
    });
  });
});

describe('HandleCreateBookComplete', () => {
  describe('Create Book Success', () => {
    const action = {
      type: 'BOOK_CREATE_COMPLETE',
      payload: {},
    };

    const gen = handleCreateBookComplete(action);

    it('should put an action to redirect user to index', () => {
      const route = '/';
      const expectedPut = put({
        type: 'ROUTE_CHANGE_PENDING',
        payload: {
          route,
        },
      });

      expect(gen.next().value).toEqual(expectedPut);
    });

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Create Book Failure', () => {
    const error = new Error();
    const action = {
      type: 'BOOK_CREATE_COMPLETE',
      error: true,
      payload: {
        error,
      },
    };

    const gen = handleCreateBookComplete(action);

    it('should be done', () => {
      expect(gen.next().done).toBe(true);
    });
  });
});
