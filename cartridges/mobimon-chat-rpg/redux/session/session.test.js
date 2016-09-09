import test from 'tape';
import {
  SELECT_ROOM,
  selectRoom,
} from './session-actions';
import { room } from './session-reducers';

const initialRoomState = {
  roomKey: '',
  roomName: '',
};

test('Character', nest => {
  // Actions
  nest.test('... should create a SELECT_ROOM action', assert => {
    const msg = 'session action creator should create a SELECT_ROOM action.';
    const roomState = {
      roomKey: '123',
      roomName: '123',
    };

    const actual = selectRoom(roomState);

    const expected = {
      type: SELECT_ROOM,
      selected: {
        roomKey: '123',
        roomName: '123',
      },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... reducer should return initial state.', assert => {
    const msg = 'room reducer should return initial state.';
    const actual = room(undefined, {});
    const expected = initialRoomState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle SELECT_ROOM.', assert => {
    const msg = 'room reducer should SELECT_ROOM.';
    const roomState = { roomKey: '123', roomName: '123' };
    const actual = room(undefined, {
      type: SELECT_ROOM,
      selected: roomState,
    });

    const expected = roomState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
