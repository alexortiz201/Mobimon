import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createChatMessages from './ChatMessages.js';

import helpers from '../../../../core/public/utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const ChatMessages = createChatMessages(React);

const greetingMessage = {
  message: 'Welcome to your Doom!',
  character: {
    name: 'octobruise',
  },
};

const defaultProps = {
  messages: [],
  greeting: 'Welcome to your doom!',
  renderMessages: () => <div className="speech-bubble" />,
};

test('ChatMessages', (nest) => {
  nest.test('... should render component', (assert) => {
    const msg = '... should render ChatMessages.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<ChatMessages {...props} />));
    const output = $('.chat-rpg-messages').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render greeting', (assert) => {
    const msg = '... should render greeting if there are no messages.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<ChatMessages {...props} />));
    const output = $('.chat-rpg-greeting').text();

    const actual = output;
    const expected = props.greeting;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render list of messages container', (assert) => {
    const msg = '... should rendered list of messages container.';
    const props = helpers.makeProps(defaultProps, {
      messages: [
        greetingMessage,
      ],
    });

    const $ = dom.load(render(<ChatMessages {...props} />));
    const output = $('.chat-rpg-message-list').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render message', (assert) => {
    const msg = '... should rendered message.';
    const props = helpers.makeProps(defaultProps, {
      messages: [
        greetingMessage,
      ],
    });

    const $ = dom.load(render(<ChatMessages {...props} />));
    const output = $('.speech-bubble').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
