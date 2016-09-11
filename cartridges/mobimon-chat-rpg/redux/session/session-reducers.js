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
  GET_PLAYERS,
  getPlayers,
} from './session-actions';


export function fetchFromFirebase(resource) {
  return createDatabaseRef(resource)
    .once('value')
    .then((FirebaseObject) => FirebaseObject.val())
    .then(getRoomsSuccess)
    .catch(getRoomsFailure);
}


export function updateFirebase(resource, updateObj) {
  return createDatabaseRef(resource)
    .update(updateObj)
    .then(selectRoomSuccess)
    .catch(selectRoomFailure);
}

export function room(state = {
  key: '',
  name: '',
  players: [],
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
          `chatrpg/games/${action.room.key}/players`, action.updateObj),
        Effects.constant(getPlayers()),
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

    case GET_PLAYERS:
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchFromFirebase,
          `chatrpg/games/${action.room.index}/players`),
      );

    default:
      return state;
  }
}

export function availableRooms(state = {
  loading: false,
  rooms: [],
}, action) {
  switch (action.type) {
    case GET_ROOMS:
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchFromFirebase, 'chatrpg/games'),
      );

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: [...action.rooms],
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

// //////////////////////////////////////////////
// import {
//   // SELECT_BATTLE,
//   REQUEST_BATTLES,
//   RECEIVE_BATTLES,
//   JOINING_BATTLE,
//   JOIN_SUCCESSFUL,
// } from '../actions/battle';

// const initialState = {
//   currentBattleKey: '',
//   currentBattleSession: {
//     attendees: []
//   }
// };

// function battle(state = initialState, action) {
//   let payload = action.payload;
//   switch(action.type) {
//   // case SELECT_BATTLE:
//   //   return {
//   //     ...state,
//   //     currentBattle: payload.currentBattle
//   //   };

//   case REQUEST_BATTLES:
//     return {
//       ...state,
//       requestingBattles: true
//     };

//   case RECEIVE_BATTLES:
//     return {
//       ...state,
//       battles: payload.battles
//     };

//   case JOINING_BATTLE:
//     return {
//       ...state,
//       joiningBattle: payload.joiningBattle
//     };

//   case JOIN_SUCCESSFUL:
//     return {
//       ...state,
//       currentBattleKey: payload.currentBattleKey,
//       currentBattleSession: payload.currentBattleSession,
//       joined: true
//     };
//   default:
//     return state;
//   }
// }

export default {
  room,
  availableRooms,
};
