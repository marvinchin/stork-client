import { getUserProfile, getUserProfileComplete } from '../../src/ActionCreators/UserActionCreators';

describe('getUserProfile', () => {
  const username = 'test_user';
  it('should create a GET_USER_PROFILE_PENDING action with correct payload', () => {
    const expectedAction = {
      type: 'GET_USER_PROFILE_PENDING',
      payload: {
        username,
      },
    };

    const action = getUserProfile(username);

    expect(action).toEqual(expectedAction);
  });
});

describe('getUserProfileComplete', () => {
  describe('Success', () => {
    const user = {
      id: 1,
    };
    it('should create a successful GET_USER_PROFILE_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_USER_PROFILE_COMPLETE',
        payload: {
          user,
        },
      };

      const action = getUserProfileComplete(null, user);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('Failure', () => {
    const error = new Error();
    it('should create a failure GET_USER_PROFILE_COMPLETE action', () => {
      const expectedAction = {
        type: 'GET_USER_PROFILE_COMPLETE',
        error: true,
        payload: {
          error,
        },
      };

      const action = getUserProfileComplete(error);

      expect(action).toEqual(expectedAction);
    });
  });
});
