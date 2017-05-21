import React, { Component } from 'react';

import Header from './Header';
import Description from './Description';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Description />
      </div>
    );
  }
}

export default LandingPage;
