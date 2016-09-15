import test from 'tape';
import { Effects, loop } from 'redux-loop';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  getRooms,
  getRoomsSuccess,
  getRoomsFailure,
  SELECT_ROOM,
  SELECT_ROOM_SUCCESS,
  SELECT_ROOM_FAILURE,
  selectRoom,
  selectRoomSuccess,
  selectRoomFailure,
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  getPlayers,
  getPlayersSuccess,
  getPlayersFailure,
} from './session-actions';
import {
  room,
  players,
  availableRooms,
  fetchFromFirebase,
  updateFirebase
} from './session-reducers';

const initialRoomState = {
  key: '',
  name: '',
};

const initialPlayersState = {
  available: {},
};

const initialAvailableRoomsState = {
  rooms: {},
};

test('Session - Room', (nest) => {
  // Actions
  nest.test('... should create a SELECT_ROOM action', (assert) => {
    const msg = 'session action creator should create a SELECT_ROOM action.';
    const roomState = {
      key: '123',
      name: '123',
    };

    const actual = selectRoom(roomState, {});

    const expected = {
      type: SELECT_ROOM,
      room: {
        key: '123',
        name: '123',
      },
      updateObj: {},
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a SELECT_ROOM_SUCCESS action', (assert) => {
    const msg = 'session action creator should create a SELECT_ROOM_SUCCESS action.';

    const actual = selectRoomSuccess();
    const expected = {
      type: SELECT_ROOM_SUCCESS,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a SELECT_ROOM_FAILURE action', (assert) => {
    const msg = 'session action creator should create a SELECT_ROOM_FAILURE action.';
    const error = 'SELECT_ROOM_FAILURE error message'

    const actual = selectRoomFailure(error);
    const expected = {
      type: SELECT_ROOM_FAILURE,
      error,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... reducer should return initial state.', (assert) => {
    const msg = 'room reducer should return initial state.';
    const actual = room(undefined, {});
    const expected = initialRoomState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle SELECT_ROOM.', (assert) => {
    const msg = 'room reducer should SELECT_ROOM.';
    const updateObj = {};
    const roomState = {
      key: '123',
      name: '123',
    };
    const actual = room(undefined, {
      type: SELECT_ROOM,
      room: roomState,
      updateObj,
    });

    const expected = loop(
      { loading: true, key: '123', name: '123' },
      Effects.promise(updateFirebase,
        `chatrpg/games/${roomState.key}/players`, updateObj,
        selectRoomSuccess,
        selectRoomFailure,
      ),
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

test('Session - AvailableRooms', (nest) => {
  // Actions
  nest.test('... should create a GET_ROOMS action', (assert) => {
    const msg = 'session action creator should create a GET_ROOMS action.';
    const actual = getRooms();
    const expected = {
      type: GET_ROOMS,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a GET_ROOMS_SUCCESS action', (assert) => {
    const msg = 'session action creator should create a GET_ROOMS_SUCCESS action.';
    const roomsState = {
      '123': { name: '123' }
    };

    const actual = getRoomsSuccess(roomsState);
    const expected = {
      type: GET_ROOMS_SUCCESS,
      rooms: { ...roomsState, },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a GET_ROOMS_FAILURE action', (assert) => {
    const msg = 'session action creator should create a GET_ROOMS_FAILURE action.';
    const error = 'GET_ROOMS_FAILURE Error';
    const actual = getRoomsFailure(error);
    const expected = {
      type: GET_ROOMS_FAILURE,
      error,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... reducer should return initial state.', (assert) => {
    const msg = 'availableRooms reducer should return initial state.';
    const actual = availableRooms(undefined, {});
    const expected = initialAvailableRoomsState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle GET_ROOMS.', (assert) => {
    const msg = 'availableRooms reducer should GET_ROOMS.';
    const actual = availableRooms(undefined, {
      type: GET_ROOMS,
    });

    const expected = loop(
      { loading: true, rooms: {} },
      Effects.promise(fetchFromFirebase, 'chatrpg/games',
        getRoomsSuccess,
        getRoomsFailure,
      )
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle GET_ROOMS_SUCCESS.', (assert) => {
    const msg = 'availableRooms reducer should GET_ROOMS_SUCCESS.';
    const aRoomsState = {
      loading: false,
      rooms: {
        '123' : { name: '123' },
      },
    };
    const actual = availableRooms(undefined, {
      type: GET_ROOMS_SUCCESS,
      rooms: {
        '123' : { name: '123' },
      },
    });

    const expected = aRoomsState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});

test('Session - Players', (nest) => {
  // Actions
  nest.test('... should create a GET_PLAYERS action', (assert) => {
    const msg = 'session action creator should create a GET_PLAYERS action.';
    const playerState = {};
    const actual = getPlayers('123');
    const expected = {
      type: GET_PLAYERS,
      key: '123',
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a GET_PLAYERS_SUCCESS action', (assert) => {
    const msg = 'session action creator should create a GET_PLAYERS_SUCCESS action.';
    const playersState = {
      Case: {
        color: 'purple',
      }
    };

    const actual = getPlayersSuccess(playersState);
    const expected = {
      type: GET_PLAYERS_SUCCESS,
      available: playersState,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a GET_PLAYERS_FAILURE action', (assert) => {
    const msg = 'session action creator should create a GET_PLAYERS_FAILURE action.';
    const errorMsg = 'GET_PLAYERS_FAILURE Error';

    const actual = getPlayersFailure(errorMsg);
    const expected = {
      type: GET_PLAYERS_FAILURE,
      error: errorMsg,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  // Reducers
  nest.test('... reducer should return initial state.', (assert) => {
    const msg = 'players reducer should return initial state.';
    const actual = players(undefined, {});
    const expected = initialPlayersState;

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle GET_PLAYERS.', (assert) => {
    const msg = 'players reducer should GET_PLAYERS.';
    const actual = players(undefined, {
      type: GET_PLAYERS,
      key: '123',
    });

    const expected = loop(
      { loading: true, available: {} },
      Effects.promise(fetchFromFirebase,
        `chatrpg/games/123/players`,
        getPlayersSuccess,
        getPlayersFailure,
      ),
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle GET_PLAYERS_SUCCESS.', (assert) => {
    const msg = 'players reducer should GET_PLAYERS_SUCCESS.';
    const playersState = {
      Case: {
        color: 'purple'
      },
    };
    const actual = players(undefined, {
      type: GET_PLAYERS_SUCCESS,
      available: { ...playersState },
    });

    const expected = {
      loading: false,
      available: { ...playersState },
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
