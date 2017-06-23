import config from '../config';

function makeRequest(url, options, data = {}) {
  const { method, useCredentials } = options;
  const fetchParams = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

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
    useCredentials: true,
  };

  return makeRequest(url, options, data);
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
    useCredentials: true,
  };

  return makeRequest(url, options, data);
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
    useCredentials: true,
  };

  return makeRequest(url, options, data);
}

export function getGenres() {
  const url = `${config.BACKEND_API_URL}/books/genres`;
  const options = {
    method: 'GET',
  };

  return makeRequest(url, options);
}
