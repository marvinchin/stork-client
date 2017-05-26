import React from 'react';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';


import Page from './Page';
import reducers from '../Reducers';
import sagas from '../Sagas';

// expose history for redux/sagas to handle redirection
export const history = createBrowserHistory();

// initialize redux store and sagas
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagas);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Page />
    </Router>
  </Provider>
);

export default App;
