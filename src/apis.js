import { post } from 'popsicle';
import config from '../config';

export function loginUser(username, password) {
  return post({
    url: `${config.BACKEND_API_URL}/authentication/login`,
    body: {
      username,
      password,
      expiry: config.SESSION_EXPIRY,
    },
  });
}

export function registerUser(username, password, email, gender = 'Male', description = '') {
  return post({
    url: `${config.BACKEND_API_URL}/authentication/create`,
    body: {
      username,
      password,
      email,
      gender,
      description,
    },
  });
}

export function createBook(title, author, genre, description) {
  return post({
    url: `${config.BACKEND_API_URL}/book/create`,
    body: {
      title,
      author,
      genre,
      description,
    },
  });
}
