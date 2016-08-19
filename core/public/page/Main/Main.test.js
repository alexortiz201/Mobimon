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

  nest.test('... with children', assert => {
    const msg = 'Main should render children.';
    const props = helpers.makeProps(defaultProps, {
      children: <div />,
    });

    const $ = dom.load(render(<Main {...props} />));
    const output = $('.app-container').children().length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  // nest.test('... with selected character', assert => {
  //   const msg = 'Main should render children.';
  //   const props = {
  //     children: <div />,
  //   };

  //   const $ = dom.load(render(<Main {...props} />));
  //   const output = $('.character').length;

  //   const actual = output > 0;
  //   const expected = true;

  //   assert.equal(actual, expected, msg);
  //   assert.end();
  // });
});
