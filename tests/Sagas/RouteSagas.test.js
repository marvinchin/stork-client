import { put } from 'redux-saga/effects';

import { handleChangeRoute } from '../../src/Sagas/RouteSagas';
import * as app from '../../src/components/App';

describe('HandleChangeRoute', () => {
  app.history.push = jest.fn();
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

  it('should call post with the route', () => {
    expect(app.history.push).toBeCalledWith(route);
  });

  it('should be done', () => {
    expect(gen.next().done).toBe(true);
  });
});
