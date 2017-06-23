import ActionTypes from '../constants/Actions';

export function changeRoute(route) {
  return {
    type: ActionTypes.ROUTE_CHANGE_PENDING,
    payload: {
      route,
    },
  };
}

// Currently not in use, but potentially useful to trigger actions that should
// be performed upon every route change (possibly cacheing/requiring bundles)

// Consider if need to handle error, if we do use this!
export function changeRouteComplete() {
  return {
    type: ActionTypes.ROUTE_CHANGE_COMPLETE,
    payload: {},
  };
}
