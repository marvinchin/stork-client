import { put } from 'redux-saga/effects';

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

  it('should call the changeRouteComplete action creator', () => {
    const expectedPut = put({
      type: 'ROUTE_CHANGE_COMPLETE',
    });
    expect(gen.next().value).toEqual(expectedPut);
  });

  it('should call push with the route', () => {
    expect(history.push).toBeCalledWith(route);
  });

  it('should be done', () => {
    expect(gen.next().done).toBe(true);
  });
});
