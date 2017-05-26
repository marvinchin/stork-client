import { changeRoute, changeRouteComplete } from '../../src/ActionCreators/RouteActionCreators';

describe('Change Route', () => {
  const route = '/';
  const action = changeRoute(route);
  it('action should have type ROUTE_CHANGE_PENDING', () => {
    expect(action.type).toEqual('ROUTE_CHANGE_PENDING');
  });

  it('action should not have error', () => {
    expect(action.error).not.toBeDefined();
  });

  it('action payload should contain the route', () => {
    expect(action.payload).toEqual({ route });
  });
});

describe('Change Route Complete', () => {
  const action = changeRouteComplete();
  it('action should have type ROUTE_CHANGE_COMPLETE', () => {
    expect(action.type).toEqual('ROUTE_CHANGE_COMPLETE');
  });

  it('action should not have error', () => {
    expect(action.error).not.toBeDefined();
  });
});
