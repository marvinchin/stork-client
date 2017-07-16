import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListedBook from './ListedBook';
import UserBooks from './UserBooks';

class NewTradeForm extends Component {
  constructor(props) {
    super(props);
    const { listedBook } = props;
    this.state = {
      listedBook,
      offeredBooks: [],
      description: '',
    };

    this.onOfferChange = this.onOfferChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onTradeSubmit = this.onTradeSubmit.bind(this);
  }

  onOfferChange(offeredBooks) {
    this.setState({
      offeredBooks,
    });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onTradeSubmit(e) {
    e.preventDefault();
    const { listedBook, offeredBooks, description } = this.state;
    const offeredBookIds = offeredBooks.map(book => (
      book.value
    ));
    this.props.handleTradeSubmit(offeredBookIds, description);
  }

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
          <UserBooks
            userBooks={userBooks}
            offeredBooks={this.state.offeredBooks}
            onOfferChange={this.onOfferChange}
          />
        </div>
        <div className="l-form__input-group">
          <label htmlFor="details">
            Additional Details
          </label>
          <textarea
            id="details"
            rows="3"
            className="c-form__input--textarea"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </div>
        <button
          className="c-button"
          onClick={this.onTradeSubmit}
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
  handleTradeSubmit: PropTypes.func.isRequired,
};

export default NewTradeForm;
