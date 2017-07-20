import { all } from "redux-saga/effects";
import { authSagas } from "./AuthSagas";
import { routeSagas } from "./RouteSagas";
import { bookSagas } from "./BookSagas";
import { userSagas } from "./UserSagas";
import { tradeSagas } from "./TradeSagas";

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...routeSagas,
    ...bookSagas,
    ...userSagas,
    ...tradeSagas
  ]);
}
