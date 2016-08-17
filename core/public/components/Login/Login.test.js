import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createLogin from './Login';

import { LOGIN, userLogin } from './Login-actions';
import login from './Login-reducers';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Login = createLogin(React);
const defaultProps = {
  className: 'login',
  label: 'Username',
  buttonText: 'Log In',
  autoFocus: false,
};

test('Login', nest => {
  // Component
  nest.test('... should render', assert => {
    const msg = 'Login should render.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}`).length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render form', assert => {
    const msg = 'Login should render form.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-form`).length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render form text input', assert => {
    const msg = 'Login should render form text input.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-form-input-field`)
      .length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render button', assert => {
    const msg = 'Login should render button.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-button`).length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render button', assert => {
    const msg = 'Login should render button with text.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-button`).attr('value');

    const actual = output;
    const expected = props.buttonText;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  // Actions
  nest.test('... should create an action', assert => {
    const msg = 'Login action creator should create an action.';
    const name = 'Alex';

    const actual = userLogin({
      name,
    });

    const expected = {
      type: LOGIN,
      user: { name: 'Alex' }
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... should return initial state.', assert => {
    const msg = 'Login reducer should return initial state.';
    const actual = login(undefined, {});

    const expected = { user: {} };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should return updated state.', assert => {
    const msg = 'Login reducer should handle LOGIN.';
    const name = 'Alex';
    const actual = login(undefined, {
      type: LOGIN,
      user: {
        name,
      }
    });

    const expected = {
      user: {
        name,
      }
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
