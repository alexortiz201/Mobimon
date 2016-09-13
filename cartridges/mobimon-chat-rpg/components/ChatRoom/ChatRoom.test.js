import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createChatRoom from './ChatRoom.js';

import helpers from '../../../../core/public/utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const ChatRoom = createChatRoom(React);

const defaultProps = {
  connect: () => {},
  renderMessage: message => <div>{message}</div>,
  sendMessage: message => <div>{message}</div>,
  userName: '',
  userCharacter: {},
  otherUsers: [],
};

test('ChatRoom', (nest) => {
  nest.test('... should render', (assert) => {
    const msg = '... should render ChatRoom.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<ChatRoom {...props} />));
    const output = $('.chat-room').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render children', (assert) => {
    const msg = '... should render children.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(
      <ChatRoom {...props}>
        <div className="child-item" />
      </ChatRoom>
    ));
    const output = $('.child-item').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
