import { Effects, loop } from 'redux-loop';
import { getDBUrl } from '../../services/firebase/firebase.service';
import {
  SELECT_ROOM,
} from './session-actions'; // loadingStart, loadingSuccess, loadingFailure


export function fetchDetails() {
  return fetch(getDBUrl())
    .then((r) => r.json())
    .then(() => {})
    .catch(() => {});
}

const initialState = {
  roomKey: '',
  roomName: '',
};

export function room(state = initialState, action) {
  switch (action.type) {
    case SELECT_ROOM:
      return {
        ...state,
        ...action.payload,
      };
    case 'LOADING_START':
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchDetails, action.payload.id),
      );

    case 'LOADING_SUCCESS':
      return {
        ...state,
        loading: false,
        details: action.payload,
      };

    case 'LOADING_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.message,
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
};
