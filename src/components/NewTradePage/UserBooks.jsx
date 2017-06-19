import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class UserBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBooks: '' };
    this.onSelectedBooksUpdate = this.onSelectedBooksUpdate.bind(this);
  }

  onSelectedBooksUpdate(selectedBooks) {
    this.setState({
      selectedBooks,
    });
  }

  render() {
    const { userBooks } = this.props;
    const bookOptions = userBooks.map(book => (
      {
        value: book.id,
        label: book.title,
      }
    ));

    return (
      <div className="c-user-books">
        <Select
          value={this.state.selectedBooks}
          options={bookOptions}
          onChange={this.onSelectedBooksUpdate}
          multi
        />
      </div>
    );
  }
}

UserBooks.propTypes = {
  userBooks: PropTypes.array.isRequired,
};

export default UserBooks;
