import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class UserBooks extends Component {
  render() {
    const { userBooks, offeredBooks, onOfferChange } = this.props;
    const bookOptions = userBooks.map(book => (
      {
        value: book.id,
        label: book.title,
      }
    ));

    return (
      <div className="c-user-books">
        <Select
          value={offeredBooks}
          options={bookOptions}
          onChange={onOfferChange}
          multi
        />
      </div>
    );
  }
}

UserBooks.propTypes = {
  userBooks: PropTypes.array.isRequired,
  offeredBooks: PropTypes.array.isRequired,
  onOfferChange: PropTypes.func.isRequired,
};

export default UserBooks;
