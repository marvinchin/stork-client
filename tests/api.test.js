import * as request from 'popsicle';

import { loginUser } from '../src/Apis';
import config from '../config';

describe('Login User', () => {
  request.post = jest.fn();
  const username = 'test_user';
  const password = 'test_pass';
  const expectedUrl = `${config.BACKEND_API_URL}/authentication/login`;
  const expectedBody = {
    username,
    password,
    expiry: config.SESSION_EXPIRY,
  };
  it('should make post request to endpoint with body containing username, password and expiry', () => {
    expect.assertions(3);
    loginUser(username, password);
    expect(request.post).toBeCalled();
    const calledOpts = request.post.mock.calls[0][0];
    expect(calledOpts.url).toEqual(expectedUrl);
    expect(calledOpts.body).toEqual(expectedBody);
  });
});
