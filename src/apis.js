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


