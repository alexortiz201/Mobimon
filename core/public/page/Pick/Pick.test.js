import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createPick from './Pick';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Pick = createPick(React);

const defaultProps = {
  user: { name: 'Uncle Bob' },
};

test('Pick', nest => {
  nest.test('... should render', assert => {
    const msg = 'Pick should render picking page.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Pick {...props} />));
    const output = $('.pick-character-container').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render user name', assert => {
    const msg = 'Pick should render user name on page.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Pick {...props} />));
    const output = $('.user-name').text();

    const actual = output;
    const expected = props.user.name;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
