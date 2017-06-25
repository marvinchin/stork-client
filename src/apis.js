import config from '../config';

function makeRequest(url, options) {
  const { method, data, useCredentials } = options;
  const fetchParams = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    fetchParams.body = JSON.stringify(data);
  }

  if (useCredentials) {
    fetchParams.credentials = 'include';
  }

  return fetch(url, fetchParams);
}

export function loginUser(username, password) {
  const url = `${config.BACKEND_API_URL}/authentication/login`;
  const data = {
    username,
    password,
    expiry: config.SESSION_EXPIRY,
  };
  const options = {
    method: 'POST',
    data,
    useCredentials: true,
  };

  return makeRequest(url, options);
}

export function registerUser(username, password, email, gender = 'Male', description = '') {
  const url = `${config.BACKEND_API_URL}/authentication/create`;
  const data = {
    username,
    password,
    email,
    gender,
    description,
  };
  const options = {
    method: 'POST',
    data,
    useCredentials: true,
  };

  return makeRequest(url, options);
}

export function createBook(title, author, genre, description) {
  const url = `${config.BACKEND_API_URL}/books/create`;
  const data = {
    title,
    author,
    genre: [genre],
    description,
  };
  const options = {
    method: 'POST',
    data,
    useCredentials: true,
  };

  return makeRequest(url, options);
}

export function getGenres() {
  const url = `${config.BACKEND_API_URL}/genres/list`;
  const options = {
    method: 'GET',
  };

  return makeRequest(url, options);
}

export function getIndexBooks() {
  const url = `${config.BACKEND_API_URL}/books`;
  const options = {
    method: 'GET',
  };

  return makeRequest(url, options);
}
