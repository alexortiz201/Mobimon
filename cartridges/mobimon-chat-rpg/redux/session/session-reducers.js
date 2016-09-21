import { Effects, loop } from 'redux-loop';
import { createDatabaseRef } from '../../services/firebase/firebase.service';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  getRoomsSuccess,
  getRoomsFailure,
  SELECT_ROOM,
  SELECT_ROOM_SUCCESS,
  SELECT_ROOM_FAILURE,
  selectRoomSuccess,
  selectRoomFailure,
  LEAVE_ROOM,
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


export function fetchFromFirebase(resource, successFn, failFn) {
  return createDatabaseRef(resource)
    .once('value')
    .then(FirebaseObj => FirebaseObj.val())
    .then(successFn)
    .catch(failFn);
}


export function updateFirebase(resource, updateObj, successFn, failFn) {
  return createDatabaseRef(resource)
    .update(updateObj)
    .then(successFn)
    .catch(failFn);
}

export function room(state = {
  key: '',
  name: '',
}, action) {
  switch (action.type) {
    case SELECT_ROOM:
      return loop(
        {
          ...state,
          ...action.room,
          loading: true,
        },
        Effects.batch([
          Effects.promise(updateFirebase,
            `chatrpg/games/${action.room.key}`, action.updateObj,
            selectRoomSuccess,
            selectRoomFailure,
          ),
          Effects.call(getPlayers, action.room.key),
        ])
      );

    case SELECT_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SELECT_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };


    case LEAVE_ROOM:
      return loop(
        {
          ...state,
          ...{ key: '', name: '' },
        },
        Effects.call(removePlayers, action.room.key, [action.userName]),
      );

    default:
      return state;
  }
}

export function availableRooms(state = {
  rooms: {},
}, action) {
  switch (action.type) {
    case GET_ROOMS:
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchFromFirebase, 'chatrpg/games',
          getRoomsSuccess,
          getRoomsFailure,
        ),
      );

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: { ...action.rooms },
      };

    case GET_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

/**
 * Functional iterative loop to run against Object
 * props.
 * @param  {Object}  hash    object to be cloned and traversed
 * @param  {Array}   keyList  array of keys
 * @param  {Function} fn      operation on keys
 * @return {Object}           clone with fn ran against each prop
 * in the keyList.
 */
const operateOnObjectKeyList = (hash, keyList, fn) => {
  const hashCopy = Object.assign({}, hash);
  keyList.forEach(key => fn(hash, key, hashCopy[key]));
};

// eslint-disable-next-line
const deletePlayer = (hash, key, val) => val && delete hash[key];

export function players(state = {
  available: {},
}, action) {
  switch (action.type) {
    case GET_PLAYERS:
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchFromFirebase,
          `chatrpg/games/${action.key}/players`,
          getPlayersSuccess,
          getPlayersFailure,
        ),
      );

    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        available: { ...action.available },
      };

    case GET_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case REMOVE_PLAYERS:
      return loop(
        {
          ...state,
          ...{
            available: operateOnObjectKeyList(state.available, action.playerNames, deletePlayer),
          },
          loading: true,
        },
        Effects.promise(updateFirebase,
          `chatrpg/games/${action.roomKey}/players`, state.available,
          removePlayersSuccess,
          removePlayersFailure,
        ),
      );

    case REMOVE_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        available: { ...action.available },
      };

    case REMOVE_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default {
  room,
  players,
  availableRooms,
};
