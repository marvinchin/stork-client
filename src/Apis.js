import config from "../config";

function makeRequest(url, options) {
  const { method, data, useCredentials } = options;
  const fetchParams = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (data) {
    fetchParams.body = JSON.stringify(data);
  }

  if (useCredentials) {
    fetchParams.credentials = "include";
  }

  return fetch(url, fetchParams)
    .then(res => res.json().then(body => ({ status: res.status, body })))
    .catch(err => err);
}

export function authenticateUser() {
  const url = `${config.BACKEND_API_URL}/authentication/status`;
  const options = {
    method: "GET",
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function loginUser(username, password) {
  const url = `${config.BACKEND_API_URL}/authentication/login`;
  const data = {
    username,
    password,
    expiry: config.SESSION_EXPIRY
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function logoutUser() {
  const url = `${config.BACKEND_API_URL}/authentication/logout`;
  const options = {
    method: "POST",
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function registerUser(
  username,
  password,
  email,
  gender = "Male",
  description = ""
) {
  const url = `${config.BACKEND_API_URL}/authentication/create`;
  const data = {
    username,
    password,
    email,
    gender,
    description
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function createBook(title, author, genre, description) {
  const url = `${config.BACKEND_API_URL}/books/create`;
  const data = {
    title,
    author,
    genre,
    description
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function getBookById(bookId) {
  const url = `${config.BACKEND_API_URL}/books/getByID/${bookId}`;
  const options = {
    method: "GET"
  };

  return makeRequest(url, options);
}

export function getGenres() {
  const url = `${config.BACKEND_API_URL}/genres/list`;
  const options = {
    method: "GET"
  };

  return makeRequest(url, options);
}

export function getIndexBooks() {
  const url = `${config.BACKEND_API_URL}/books/list/${config.NUM_BOOKS_PER_LOAD}`;
  const options = {
    method: "GET"
  };

  return makeRequest(url, options);
}

export function searchBooks(query, searchBy, genre) {
  const url = `${config.BACKEND_API_URL}/books/search`;
  const data = {
    query,
    searchBy,
    genre
  };
  const options = {
    method: "POST",
    data
  };

  return makeRequest(url, options);
}

export function getUserProfile(username) {
  const url = `${config.BACKEND_API_URL}/users/${username}`;
  const options = {
    method: "GET"
  };

  return makeRequest(url, options);
}

// TODO: Write test for this API call
export function updateUserProfile(
  description,
  profilePicture,
  gender,
  password
) {
  const url = `${config.BACKEND_API_URL}/users/edit`;
  const data = {
    description,
    profilePicture,
    gender,
    password
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function getUserTrades() {
  const url = `${config.BACKEND_API_URL}/trades/list`;
  const options = {
    method: "GET",
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function getTradeById(tradeId) {
  const url = `${config.BACKEND_API_URL}/trades/getByID/${tradeId}`;
  const options = {
    method: "GET",
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function createTrade(book, offer, description) {
  const url = `${config.BACKEND_API_URL}/trades/create`;
  const data = {
    book,
    offer,
    description
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function cancelTrade(trade) {
  const url = `${config.BACKEND_API_URL}/trades/update`;
  const status = "C";
  const data = {
    trade,
    status
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function acceptTrade(trade, selection) {
  const url = `${config.BACKEND_API_URL}/trades/update`;
  const status = "A";
  const data = {
    trade,
    selection,
    status
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function getTradeMessages(tradeId) {
  const url = `${config.BACKEND_API_URL}/messages/getMessagesForTrade/${tradeId}`;

  const options = {
    method: "GET",
    useCredentials: true
  };

  return makeRequest(url, options);
}

export function sendTradeMessage(tradeId, content) {
  const url = `${config.BACKEND_API_URL}/messages/create`;
  const data = {
    trade: tradeId,
    content
  };
  const options = {
    method: "POST",
    data,
    useCredentials: true
  };

  return makeRequest(url, options);
}
