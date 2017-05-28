import React from 'react';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from '../history';


import Page from './Page';
import reducers from '../Reducers';
import sagas from '../Sagas';



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
