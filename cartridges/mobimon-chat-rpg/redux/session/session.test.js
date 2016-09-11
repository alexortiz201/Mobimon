import test from 'tape';
import { Effects, loop } from 'redux-loop';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  // GET_ROOMS_FAILURE,
  getRoomsSuccess,
  getRoomsFailure,
  SELECT_ROOM,
  // SELECT_ROOM_SUCCESS,
  // SELECT_ROOM_FAILURE,
  selectRoom,
  selectRoomSuccess,
  selectRoomFailure,
  // GET_PLAYERS,
  // GET_PLAYERS_SUCCESS,
  // GET_PLAYERS_FAILURE,
  // getPlayers,
  // getPlayersSuccess,
  // getPlayersFailure,
} from './session-actions';
import {
  room,
  availableRooms,
  fetchFromFirebase,
  updateFirebase } from './session-reducers';

const initialRoomState = {
  key: '',
  name: '',
  players: {},
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
      key: '123',
      name: '123',
    };

    const actual = selectRoom(roomState, {});

    const expected = {
      type: SELECT_ROOM,
      room: {
        index: '1',
        key: '123',
        name: '123',
      },
      updateObj: {},
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
    const updateObj = {};
    const roomState = {
      key: '123',
      name: '123',
      players: {},
    };
    const actual = room(undefined, {
      type: SELECT_ROOM,
      room: roomState,
      updateObj,
    });

    const expected = loop(
      { loading: true, key: '123', name: '123', players: {} },
      Effects.promise(updateFirebase,
        `chatrpg/games/${roomState.key}/players`, updateObj,
        selectRoomSuccess,
        selectRoomFailure,
      ),
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
    const actual = availableRooms(undefined, {
      type: GET_ROOMS,
    });

    const expected = loop(
      { loading: true, rooms: [] },
      Effects.promise(fetchFromFirebase, 'chatrpg/games',
        getRoomsSuccess,
        getRoomsFailure,
      )
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
