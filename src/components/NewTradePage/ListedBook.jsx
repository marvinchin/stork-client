import React from "react";
import PropTypes from "prop-types";

import BookListing from "../BookListing";

const ListedBook = ({ listedBook }) =>
  <div className="c-listed-book">
    <BookListing {...listedBook} />
  </div>;

ListedBook.propTypes = {
  listedBook: PropTypes.object.isRequired
};

export default ListedBook;
