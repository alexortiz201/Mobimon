import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createLogout from './Logout';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Logout = createLogout(React);
const defaultProps = {
  className: 'logout',
  message: 'Good bye... Logging out...',
  logout: () => {},
};

test('Logout', nest => {
  // Component
  nest.test('... should render', assert => {
    const msg = 'Logout should render.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Logout {...props} />));
    const output = $(`.${props.className}`).length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render message', assert => {
    const msg = 'Logout should render rerouting message.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Logout {...props} />));
    const output = $(`.${props.className}`).text();

    const actual = output;
    const expected = 'Rerouting to Login...';

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render message', assert => {
    const msg = 'Logout should render good bye message.';
    const props = helpers.makeProps(
      defaultProps,
      { user: { name: 'Alex' } },
    );

    const $ = dom.load(render(<Logout {...props} />));
    const output = $(`.${props.className}`).text();

    const actual = output;
    const expected = props.message;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
