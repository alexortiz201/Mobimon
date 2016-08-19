import test from 'tape';
import {
  SELECT_CHARACTER,
  selectCharacter,
} from './character-actions';
import character from './character-reducers';

test('Character', nest => {
  // Actions
  nest.test('... should create a SELECT_CHARACTER action', assert => {
    const msg = 'user action creator should create a SELECT_CHARACTER action.';
    const characterState = { name: 'Bilsner' };

    const actual = selectCharacter(characterState);

    const expected = {
      type: SELECT_CHARACTER,
      character: { name: 'Bilsner' },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... reducer should return initial state.', assert => {
    const msg = 'character reducer should return initial state.';
    const actual = character(undefined, {});

    const initialState = {};

    const expected = initialState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle SELECT_CHARACTER.', assert => {
    const msg = 'character reducer should SELECT_CHARACTER.';
    const characterState = { name: 'Bilsner' };
    const actual = character(undefined, {
      type: SELECT_CHARACTER,
      character: characterState,
    });

    const expected = characterState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
