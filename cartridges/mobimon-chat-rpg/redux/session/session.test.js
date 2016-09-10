import test from 'tape';
import {
  SELECT_ROOM,
  selectRoom,
  GET_ROOMS,
  getRooms,
  GET_ROOMS_SUCCESS,
  getRoomsSuccess,
} from './session-actions';
import {
  room,
  availableRooms,
  fetchFromFirebase,
  updateFirebase } from './session-reducers';
import { Effects, loop } from 'redux-loop';

const initialRoomState = {
  roomKey: '',
  roomName: '',
};

const initialAvailableRoomsState = {
  loading: false,
  rooms: [],
};

test('Session', nest => {
  // Actions
  nest.test('... should create a SELECT_ROOM action', assert => {
    const msg = 'session action creator should create a SELECT_ROOM action.';
    const roomState = {
      index: '1',
      roomKey: '123',
      roomName: '123',
    };

    const actual = selectRoom(roomState);

    const expected = {
      type: SELECT_ROOM,
      room: {
        index: '1',
        roomKey: '123',
        roomName: '123',
      },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a GET_ROOMS_SUCCESS action', assert => {
    const msg = 'session action creator should create a GET_ROOMS_SUCCESS action.';
    const roomsState = [{ name: '123' }];

    const actual = getRoomsSuccess(roomsState);

    const expected = {
      type: GET_ROOMS_SUCCESS,
      rooms: [{ name: '123' }],
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
    const roomState = { index: '1', roomKey: '123', roomName: '123' };
    const actual = room(undefined, {
      type: SELECT_ROOM,
      room: roomState,
    });

    const expected = loop(
      { loading: true, roomKey: '', roomName: '' },
      Effects.promise(updateFirebase,
        `chatrpg/games/${roomState.index}/attendees`),
    );

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

  nest.test('... reducer should handle GET_ROOMS.', assert => {
    const msg = 'availableRooms reducer should GET_ROOMS.';
    const roomState = { index: '1', roomKey: '123', roomName: '123' };
    const actual = availableRooms(undefined, {
      type: GET_ROOMS,
    });

    const expected = loop(
      { loading: true, rooms: [] },
      Effects.promise(fetchFromFirebase, 'chatrpg/games')
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle GET_ROOMS_SUCCESS.', assert => {
    const msg = 'availableRooms reducer should GET_ROOMS_SUCCESS.';
    const aRoomsState = {
      loading: false,
      rooms: [{ name: '123' }],
    };
    const actual = availableRooms(undefined, {
      type: GET_ROOMS_SUCCESS,
      rooms: [{ name: '123' }],
    });

    const expected = aRoomsState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
