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
  LEAVE_ROOM,
  leaveRoom,
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  getPlayers,
  getPlayersSuccess,
  getPlayersFailure,
  REMOVE_PLAYERS,
  REMOVE_PLAYERS_SUCCESS,
  REMOVE_PLAYERS_FAILURE,
  removePlayers,
  removePlayersSuccess,
  removePlayersFailure,
} from './session-actions';
import {
  room,
  players,
  availableRooms,
  fetchFromFirebase,
  updateFirebase,
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
    const error = 'SELECT_ROOM_FAILURE error message';

    const actual = selectRoomFailure(error);
    const expected = {
      type: SELECT_ROOM_FAILURE,
      error,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a LEAVE_ROOM action', (assert) => {
    const msg = 'session action creator should create a LEAVE_ROOM action.';
    const userName = 'Alex';
    const roomState = {
      key: '123',
      name: '123',
    };

    const actual = leaveRoom(roomState, userName);
    const expected = {
      type: LEAVE_ROOM,
      room: { ...roomState },
      userName,
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
      Effects.batch([
        Effects.promise(updateFirebase,
          `chatrpg/games/${roomState.key}`, updateObj,
          selectRoomSuccess,
          selectRoomFailure,
        ),
        Effects.call(getPlayers, roomState.key),
      ]),
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle LEAVE_ROOM.', (assert) => {
    const msg = 'room reducer should LEAVE_ROOM.';
    const roomState = {
      key: '123',
      name: '123',
    };
    const userName = 'Alex';

    const actual = room(roomState, {
      type: LEAVE_ROOM,
      room: { ...roomState },
      userName,
    });

    const expected = loop(
      {
        ...roomState,
        ...{ key: '', name: '' },
      },
      Effects.call(removePlayers, roomState.key, [userName]),
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
      123: { name: '123' },
    };

    const actual = getRoomsSuccess(roomsState);
    const expected = {
      type: GET_ROOMS_SUCCESS,
      rooms: { ...roomsState },
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
        123: { name: '123' },
      },
    };
    const actual = availableRooms(undefined, {
      type: GET_ROOMS_SUCCESS,
      rooms: {
        123: { name: '123' },
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
      },
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

  nest.test('... should create a REMOVE_PLAYERS action', (assert) => {
    const msg = 'session action creator should create a REMOVE_PLAYERS action.';
    const roomKey = '123';
    const playerNames = ['Case'];
    const actual = removePlayers(roomKey, playerNames);
    const expected = {
      type: REMOVE_PLAYERS,
      roomKey,
      playerNames,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a REMOVE_PLAYERS_SUCCESS action', (assert) => {
    const msg = 'session action creator should create a REMOVE_PLAYERS_SUCCESS action.';
    const actual = removePlayersSuccess();
    const expected = {
      type: REMOVE_PLAYERS_SUCCESS,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... should create a REMOVE_PLAYERS_FAILURE action', (assert) => {
    const msg = 'session action creator should create a REMOVE_PLAYERS_FAILURE action.';
    const error = 'REMOVE_PLAYERS_FAILURE error';
    const actual = removePlayersFailure(error);
    const expected = {
      type: REMOVE_PLAYERS_FAILURE,
      error,
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
        'chatrpg/games/123/players',
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
        color: 'purple',
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

  nest.test('... reducer should handle GET_PLAYERS_FAILURE.', (assert) => {
    const msg = 'players reducer should GET_PLAYERS_FAILURE.';
    const error = 'GET_PLAYERS_FAILURE error';
    const playersState = {
      available: {
        Case: {
          color: 'space blue',
        },
      },
    };
    const actual = players({ ...playersState }, {
      type: GET_PLAYERS_FAILURE,
      error,
    });

    const expected = {
      ...playersState,
      loading: false,
      error,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle REMOVE_PLAYERS.', (assert) => {
    const msg = 'players reducer should REMOVE_PLAYERS.';
    const playersState = {
      available: {
        Case: {
          color: 'space blue',
        },
      },
    };
    const playerNames = ['Case'];
    const roomKey = '123';

    const actual = players({ ...playersState }, {
      type: REMOVE_PLAYERS,
      roomKey,
      playerNames,
    });

    const expected = loop(
      {
        ...playersState,
        ...{ available: {} },
        loading: true,
      },
      Effects.promise(updateFirebase,
        `chatrpg/games/${roomKey}/players`, { Case: null },
        removePlayersSuccess,
        removePlayersFailure,
      ),
    );

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle REMOVE_PLAYERS_SUCCESS.', (assert) => {
    const msg = 'players reducer should REMOVE_PLAYERS_SUCCESS.';
    const playersState = {
      available: {
        Case: {
          color: 'space blue',
        },
      },
    };
    const actual = players(playersState, {
      type: REMOVE_PLAYERS_SUCCESS,
    });

    const expected = {
      loading: false,
      ...playersState,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('... reducer should handle REMOVE_PLAYERS_FAILURE.', (assert) => {
    const msg = 'players reducer should REMOVE_PLAYERS_FAILURE.';
    const error = 'REMOVE_PLAYERS_FAILURE error';
    const playersState = {
      available: {
        Case: {
          color: 'space blue',
        },
      },
    };
    const actual = players({ ...playersState }, {
      type: REMOVE_PLAYERS_FAILURE,
      error,
    });

    const expected = {
      loading: false,
      ...playersState,
      error,
    };

    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
