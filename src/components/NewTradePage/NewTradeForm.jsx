import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListedBook from './ListedBook';
import UserBooks from './UserBooks';

class NewTradeForm extends Component {
  render() {
    const { listedBook, userBooks } = this.props;
    return (
      <div className="c-form c-new-trade-form l-flex__col">
        <div className="l-form__input-group">
          <label htmlFor="listedBook">
            You Want
          </label>
          <ListedBook listedBook={listedBook} />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="userBooks">
            You're Offering
          </label>
          <UserBooks userBooks={userBooks} />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="details">
            Additional Details
          </label>
          <textarea
            id="details"
            rows="3"
            className="c-form__input--textarea"
            ref={(input) => {
              this.details = input;
            }}
          />
        </div>
        <button
          className="c-button"
        >
          Request Trade
        </button>
      </div>
    );
  }
}

NewTradeForm.propTypes = {
  listedBook: PropTypes.object.isRequired,
  userBooks: PropTypes.array.isRequired,
};

export default NewTradeForm;
