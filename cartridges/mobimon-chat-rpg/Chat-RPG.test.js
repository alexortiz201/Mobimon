import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createChatRPG from './Chat-RPG';

import helpers from '../../core/public/utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const ChatRPG = createChatRPG(React);

const defaultProps = {
  userCharacter: {},
  render: () => {},
};

test('Chat RPG', nest => {
  nest.test('... should render', assert => {
    const msg = '... should render.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<ChatRPG {...props} />));
    const output = $('.chat-rpg-container').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
