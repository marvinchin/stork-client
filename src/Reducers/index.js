import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import BookReducer from "./BookReducer";
import UserReducer from "./UserReducer";
import TradeReducer from "./TradeReducer";

export default combineReducers({
  auth: AuthReducer,
  books: BookReducer,
  users: UserReducer,
  trades: TradeReducer
});
