import test from 'tape';

import {
  loadCartridges,
  registerCartridge,
  clearAllCartridges,
} from './cartridges-utils';

test('Cartridges-utils', nest => {
  nest.test('... should load all cartridges', assert => {
    const msg = 'Cartridges-utils loads all cartridges.';
    const actual = loadCartridges().length;
    const expected = 0;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should register a cartridge', assert => {
    const msg = 'Cartridges-utils registered a cartridge.';
    registerCartridge({
      path: '/test',
      component: {},
    });

    const actual = loadCartridges().length;
    const expected = 1;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('... should clear all cartridges', assert => {
    const msg = 'Cartridges-utils should clear all cartridges.';
    registerCartridge({
      path: '/test',
      component: {},
    });

    clearAllCartridges();

    const actual = loadCartridges().length;
    const expected = 0;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
