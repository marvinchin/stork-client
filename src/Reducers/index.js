import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import BookReducer from './BookReducer';

export default combineReducers({
  auth: AuthReducer,
  books: BookReducer,
});
