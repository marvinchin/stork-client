import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Page from './Page';

class App extends Component {
  render() {
    return (
      <Router>
        <Page />
      </Router>
    );
  }
}

export default App;