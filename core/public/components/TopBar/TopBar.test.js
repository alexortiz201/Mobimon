import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createTopBar from './TopBar';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const TopBar = createTopBar(React);

const defaultProps = {
  className: 'incubator-top-bar',
};

test('TopBar', (nest) => {
  nest.test('... should render component.', (assert) => {
    const msg = '... rendered TopBar.';
    const props = helpers.makeProps(defaultProps);
    const $ = dom.load(render(<TopBar {...props} />));
    const output = $('.top-bar').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render children.', (assert) => {
    const msg = '... rendered children.';
    const props = helpers.makeProps(defaultProps);
    const $ = dom.load(render(<TopBar {...props}>
      <div className="top-bar-child" />
    </TopBar>));
    const output = $('.top-bar-child').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
