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
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAILURE,
  leaveRoomSuccess,
  leaveRoomFailure,
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  getPlayersSuccess,
  getPlayersFailure,
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
        Effects.promise(updateFirebase,
          `chatrpg/games/${action.room.key}`, action.updateObj,
          selectRoomSuccess,
          selectRoomFailure,
        )
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
          loading: true,
        },
        Effects.promise(updateFirebase,
          `chatrpg/games/${action.room.key}`, action.updateObj,
          leaveRoomSuccess,
          leaveRoomFailure,
        )
      );

    case LEAVE_ROOM_SUCCESS:
      return {
        ...state,
        ...{ key: '', name: '' },
        loading: false,
      };

    case LEAVE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

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

    default:
      return state;
  }
}

export default {
  room,
  players,
  availableRooms,
};
