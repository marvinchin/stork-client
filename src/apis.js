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

export function registerUser(username, password, email) {
  return post({
    url: `${config.BACKEND_API_URL}/authentication/register`,
    body: {
      username,
      password,
      email,
    },
  });
}
