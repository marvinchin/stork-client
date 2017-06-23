import { put, call } from 'redux-saga/effects';

import { handleChangeRoute } from '../../src/Sagas/RouteSagas';
import history from '../../src/history';

describe('HandleChangeRoute', () => {
  history.push = jest.fn();
  const route = '/';
  const action = {
    type: 'ROUTE_CHANGE_PENDING',
    payload: {
      route,
    },
  };
  const gen = handleChangeRoute(action);

  it('should call history.push', () => {
    const expectedCall = call(history.push, route);

    expect(gen.next().value).toEqual(expectedCall);
  });

  it('should put a ROUTE_CHANGE_COMPLETE action', () => {
    const expectedPut = put({
      type: 'ROUTE_CHANGE_COMPLETE',
      payload: {},
    });
    expect(gen.next().value).toEqual(expectedPut);
  });

  it('should be done', () => {
    expect(gen.next().done).toBe(true);
  });
});
