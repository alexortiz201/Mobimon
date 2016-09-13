import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createCharacter from './Character';

import helpers from '../../utils/test/test.helpers';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

const defaultProps = {
  character: {},
  className: '',
};

test('Character', (nest) => {
  nest.test('... should render component.', (assert) => {
    const msg = 'Character rendered character component.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Character {...props} />));
    const output = $('.character').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render a specific character.', (assert) => {
    const msg = 'Character rendered a specific character.';
    const props = helpers.makeProps(defaultProps, {
      character: {
        name: 'Bilsner',
      },
      className: 'Bilsner'.toLowerCase(),
    });

    const $ = dom.load(render(<Character {...props} />));
    const output = $(`.character-${props.className}`).length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
