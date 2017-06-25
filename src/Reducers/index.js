import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import BookReducer from './BookReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  auth: AuthReducer,
  books: BookReducer,
  users: UserReducer,
});
