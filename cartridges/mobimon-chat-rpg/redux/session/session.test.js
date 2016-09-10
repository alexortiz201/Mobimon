import test from 'tape';
import {
  SELECT_ROOM,
  SET_ROOMS,
  selectRoom,
  setRooms,
} from './session-actions';
import { room, availableRooms } from './session-reducers';

const initialRoomState = {
  roomKey: '',
  roomName: '',
};

const initialAvailableRoomsState = [];

test('Session', nest => {
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

  nest.test('... should create a SET_ROOMS action', assert => {
    const msg = 'session action creator should create a SET_ROOMS action.';
    const roomsState = [{ name: '123' }];

    const actual = setRooms(roomsState);

    const expected = {
      type: SET_ROOMS,
      availableRooms: [{ name: '123' }],
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

  nest.test('... reducer should return initial state.', assert => {
    const msg = 'availableRooms reducer should return initial state.';
    const actual = availableRooms(undefined, {});
    const expected = initialAvailableRoomsState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle SET_ROOMS.', assert => {
    const msg = 'availableRooms reducer should SET_ROOMS.';
    const aRoomsState = [{ name: '123' }];
    const actual = availableRooms(undefined, {
      type: SET_ROOMS,
      availableRooms: aRoomsState,
    });

    const expected = aRoomsState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
