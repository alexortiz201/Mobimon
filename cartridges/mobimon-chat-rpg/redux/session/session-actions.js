// import {
//   COLORS,
// } from '../utils/constants';


// export const ADDING_BATTLE = 'ADDING_BATTLE';
// export function addingBattle() {
//   return {
//     type: ADDING_BATTLE,
//     payload: {
//       addingBattle: true
//     }
//   };
// }

// export const ADD_BATTLE_SUCCESSFUL = 'ADD_BATTLE_SUCCESSFUL';

// export function addBattleSuccessful(battle) {
//   return {
//     type: ADD_BATTLE_SUCCESSFUL,
//     payload: battle
//   };
// }

// export function addBattle(battle) {
//   return function(dispatch) {
//     dispatch(addingBattle());

//     let newBattle = {};
//     newBattle[battle.battleKey] = {
//       name: battle.battleName
//     };

//     let battlesRef = getGamesRef();
//     battlesRef.update(newBattle);

//     battlesRef.once('value', (battles) => {
//       if(battles.val()) {
//         // Once we have the value, send the battlekey and the battle objectA
//         dispatch(addBattleSuccessful());
//         dispatch(joinBattle(battle.battleKey));
//       }
//     });
//   };
// }

// export const REQUEST_BATTLES = 'REQUEST_BATTLES';

// export function requestBattles() {
//   return {
//     type: REQUEST_BATTLES,
//     payload: {}
//   };
// }

// export const RECEIVE_BATTLES = 'RECEIVE_BATTLES';

// export function receiveBattles(battles) {
//   return {
//     type: RECEIVE_BATTLES,
//     payload: {
//       battles
//     }
//   };
// }

// export const JOINING_BATTLE = 'JOINING_BATTLE';

// export function joiningBattle() {
//   return {
//     type: JOINING_BATTLE,
//     payload: {
//       joiningBattle: true
//     }
//   };
// }

// export const JOIN_SUCCESSFUL = 'JOIN_SUCCESSFUL';

// export function joinSuccessful(currentBattleKey, currentBattleSession) {
//   return {
//     type: JOIN_SUCCESSFUL,
//     payload: {
//       currentBattleKey,
//       currentBattleSession
//     }
//   };
// }

// // Add the user to the list of attendees on the
// // game info.
export const JOIN_BATTLE = 'JOIN_BATTLE';

export function joinBattle(battleKey) {
  return function (dispatch, getState) {
    dispatch(addingBattle());

    let battleRef = getGamesRef().child(`${battleKey}`),
      currentUserName = getState().login.userName;

    // Add the current user to the list of attendees on the game in Firebase.
    battleRef.child('attendees').update({
      [currentUserName]: {
        color: COLORS[Math.floor(Math.random() * 4)]
      }
    });
    battleRef.on('value', (battle) => {
      if(battle.val()) {
        // Once we have the value, send the battlekey and the battle objectA
        dispatch(joinSuccessful(battleKey, battle.val()));
      }
    });
  };
}
// export const FETCH_BATTLES = 'FETCH_BATTLES';

// // Thunk for atually fetching battles
// export function fetchBattles() {
//   return function (dispatch) {
//     // dispatch that the app is requesting battles
//     dispatch(requestBattles());

//     // return a firebase ref object
//     getGamesRef().on('value', (battles) => {
//       if(battles.val()) {
//         // Once we get the battles send them out to the reducer.
//         dispatch(receiveBattles(battles.val()));
//       }
//     });
//   };
// }

export const GET_ROOMS = 'GET_ROOMS';
export function getRooms() {
  return {
    type: GET_ROOMS,
  };
}

export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export function getRoomsSuccess(availableRooms) {
  return {
    type: GET_ROOMS_SUCCESS,
    rooms: availableRooms,
  };
}

export const GET_ROOMS_FAILURE = 'GET_ROOMS_FAILURE';
export function getRoomsFailure(error) {
  return {
    type: GET_ROOMS_FAILURE,
    error,
  };
}



export const SELECT_ROOM = 'SELECT_ROOM';
export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    room,
  };
}

// export const SELECT_ROOM = 'SELECT_ROOM';
// export function selectRoomSuccess(room) {
//   return {
//     type: SELECT_ROOM,
//     selected: room,
//   };
// }

