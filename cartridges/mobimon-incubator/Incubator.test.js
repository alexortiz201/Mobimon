import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createIncubator from './Incubator';

import helpers from '../../core/public/utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Incubator = createIncubator(React);

const defaultProps = {
  character: {},
  render: () => {},
};

test('Incubator', nest => {
  nest.test('... should render', assert => {
    const msg = 'Main should render incubator-container.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Incubator {...props} />));
    const output = $('.incubator-container').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
