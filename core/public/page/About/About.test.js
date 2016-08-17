import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createAbout from './About';
import resume from '../../../../shared/info/resume.json';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const About = createAbout(React);

test('About', nest => {
  nest.test('... should render', assert => {
    const msg = 'About should render about.';
    const props = {};

    const $ = dom.load(render(<About {...props} />));
    const output = $('.about').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render info', assert => {
    const msg = 'About should render info.';
    const props = {
      resume,
    };

    const $ = dom.load(render(<About {...props} />));
    const output = $('.about-info').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render resume', assert => {
    const msg = 'About should render resume.';
    const props = {
      resume,
    };

    const $ = dom.load(render(<About {...props} />));
    const output = $('.about-resume').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should render logo image', assert => {
    const msg = 'About should render logo image.';
    const props = {
      img: 'test.png',
    };

    const $ = dom.load(render(<About {...props} />));
    const output = $('.purple-dream-logo').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
