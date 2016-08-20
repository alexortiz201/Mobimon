import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createMain from './Main';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Main = createMain(React);

const defaultProps = {
  user: {},
  character: {},
  goToLogin: () => {},
  renderTopBar: () => <div className="top-bar" />,
};

test('Main', nest => {
  nest.test('... should render', assert => {
    const msg = 'Main should render app-container.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Main {...props} />));
    const output = $('.app-container').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render with top bar', assert => {
    const msg = 'Main should render with top bar.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Main {...props} />));
    const output = $('.top-bar').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
