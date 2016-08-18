import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createLogin from './Login';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Login = createLogin(React);
const defaultProps = {
  className: 'login',
  label: 'Username',
  buttonText: 'Log In',
  autoFocus: false,
  inputValue: 'Alex',
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

  nest.test('... should render text input with default text', assert => {
    const msg = 'Login should render text input with default text.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-form-input-field`).attr('value');

    const actual = output;
    const expected = props.inputValue;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render text input with user name', assert => {
    const msg = 'Login should render user name as default text.';
    const loginState = { user: { name: 'Uncle Bob' } };
    const props = helpers.makeProps(defaultProps, loginState);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-form-input-field`).attr('value');

    const actual = output;
    const expected = loginState.user.name;

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

  nest.test('... should render button with text', assert => {
    const msg = 'Login should render button with text.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Login {...props} />));
    const output = $(`.${props.className}-button`).attr('value');

    const actual = output;
    const expected = props.buttonText;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
