import { all } from 'redux-saga/effects';
import AuthSagas from './AuthSagas';
import RouteSagas from './RouteSagas';

export default function* rootSaga() {
  yield all([
    AuthSagas,
    RouteSagas,
  ]);
}
