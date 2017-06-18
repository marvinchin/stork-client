import React, { Component } from 'react';

import NewBookForm from './NewBookForm';

class NewBookPage extends Component {
  render() {
    return (
      <div className="c-new-book-page">
        <div className="c-new-book-page__title">
          <span>List your book!</span>
        </div>
        <NewBookForm />
      </div>
    );
  }
}

export default NewBookPage;
