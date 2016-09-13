import test from 'tape';
import {
  loadState,
} from './storage';

/**
 * Need to find out what the best way is to set up tests
 * for offline storage
 */
test('Storage', (nest) => {
  nest.test('... should retrieve stored state', (assert) => {
    const msg = 'Storage retrieved undefined';
    const expected = undefined;
    let actual;

    loadState()
      .then((storedState) => {
        actual = storedState;
      });

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
