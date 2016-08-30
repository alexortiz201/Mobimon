import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createSpeechBubble from './SpeechBubble.js';

import helpers from '../../../../core/public/utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const SpeechBubble = createSpeechBubble(React);

const defaultProps = {
  character: {},
  userName: '',
  message: '',
  renderCharacter: () => <div />,
};

test('Speech Bubble', nest => {
  nest.test('... should render component', assert => {
    const msg = '... should render Speech Bubble.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<SpeechBubble {...props} />));
    const output = $('.speech-bubble').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render anonamouse', assert => {
    const msg = '... should render anonamouse character div.';
    const props = helpers.makeProps(defaultProps, {
      renderCharacter: () => <div className='anonamouse' />,
    });

    const $ = dom.load(render(<SpeechBubble {...props} />));
    const output = $('.anonamouse').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should user and message', assert => {
    const msg = '... should render user and message.';
    const props = helpers.makeProps(defaultProps, {
      userName: 'Frodo',
      message: 'Precioussssssss.....',
    });

    const $ = dom.load(render(<SpeechBubble {...props} />));
    const output = $('.speech-bubble-message').text();

    const actual = output;
    const expected = 'Frodo: Precioussssssss.....';

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
