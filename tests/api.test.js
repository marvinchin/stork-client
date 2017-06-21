import { loginUser, registerUser, __RewireAPI__ as RewireAPI } from '../src/Apis';
import config from '../config';

describe('Login User', () => {
  const mockPost = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__('post', mockPost);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency('post');
  });

  it('should make post request to endpoint with correct body', () => {
    const username = 'test_user';
    const password = 'test_pass';

    const expectedUrl = `${config.BACKEND_API_URL}/authentication/login`;
    const expectedBody = {
      username,
      password,
      expiry: config.SESSION_EXPIRY,
    };

    loginUser(username, password);

    expect(mockPost).toBeCalledWith({
      url: expectedUrl,
      body: expectedBody,
    });
  });
});

describe('Register User', () => {
  const mockPost = jest.fn();

  beforeAll(() => {
    RewireAPI.__Rewire__('post', mockPost);
  });

  afterAll(() => {
    RewireAPI.__ResetDependency('post');
  });

  it('should make a post request to endpoint with correct body', () => {
    const username = 'test_user';
    const password = 'test_pass';
    const email = 'test@example.com';
    // Defaults for gender and description for now
    const gender = 'Male';
    const description = '';

    const expectedUrl = `${config.BACKEND_API_URL}/authentication/create`;
    const expectedBody = {
      username,
      password,
      email,
      gender,
      description,
    };

    registerUser(username, password, email, gender, description);

    expect(mockPost).toBeCalledWith({
      url: expectedUrl,
      body: expectedBody,
    });
  });
});
