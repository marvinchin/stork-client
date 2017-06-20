import React, { Component } from 'react';

import SearchBar from '../SearchBar';
import BookCollection from '../BookCollection';

class HomePage extends Component {
  render() {
    return (
      <div className="c-home">
        <SearchBar />
        <BookCollection />
      </div>
    );
  }
}

export default HomePage;
