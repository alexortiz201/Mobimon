import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createButton from './Button';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Button = createButton(React);

const defaultProps = {
  className: 'button-test',
  onClick: () => {},
  text: '',
};

test('Button', (nest) => {
  nest.test('... should render component.', (assert) => {
    const msg = 'Button rendered character component.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Button {...props} />));
    const output = $('.button-test').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
