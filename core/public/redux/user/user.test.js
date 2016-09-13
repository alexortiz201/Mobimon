import test from 'tape';
import {
  LOGIN_USER,
  LOGOUT_USER,
  userLogin,
  userLogout,
} from './user-actions';
import user from './user-reducers';

test('User', (nest) => {
  // Actions
  nest.test('... should create a LOGIN action', (assert) => {
    const msg = 'user action creator should create a LOGIN action.';
    const name = 'Alex';

    const actual = userLogin({
      name,
    });

    const expected = {
      type: LOGIN_USER,
      user: {
        name,
      },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create an LOGOUT action', (assert) => {
    const msg = 'user action creator should create a LOGOUT action.';

    const actual = userLogout();

    const expected = {
      type: LOGOUT_USER,
      user: undefined,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... should return initial state.', (assert) => {
    const msg = 'user reducer should return initial state.';
    const actual = user(undefined, {});

    const initialState = {
      loggedIn: false,
      name: '',
    };

    const expected = initialState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should return updated state.', (assert) => {
    const msg = 'user reducer should handle LOGIN.';
    const userState = {
      name: 'Alex',
    };
    const actual = user(undefined, {
      type: LOGIN_USER,
      user: {
        name: userState.name,
      },
    });

    const expected = {
      loggedIn: true,
      name: userState.name,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should return updated state.', (assert) => {
    const msg = 'user reducer should handle LOGOUT.';

    const actual = user(undefined, {
      type: LOGOUT_USER,
      user: {
        name: 'Alex',
      },
    });

    const initialState = {
      loggedIn: false,
      name: '',
    };
    const expected = initialState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
