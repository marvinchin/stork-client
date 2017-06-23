import { all } from 'redux-saga/effects';
import { authSagas } from './AuthSagas';
import { routeSagas } from './RouteSagas';
import { bookSagas } from './BookSagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...routeSagas,
    ...bookSagas,
  ]);
}
