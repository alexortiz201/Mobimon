
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


// // Add the user to the list of attendees on the
// // game info.
// export function joinBattle(battleKey) {
//   return function (dispatch, getState) {
//     dispatch(addingBattle());

//     let battleRef = getGamesRef().child(`${battleKey}`),
//       currentUserName = getState().login.userName;

//     // Add the current user to the list of attendees on the game in Firebase.
//     battleRef.child('attendees').update({
//       [currentUserName]: {
//         color: COLORS[Math.floor(Math.random() * 4)]
//       }
//     });
//     battleRef.on('value', (battle) => {
//       if(battle.val()) {
//         // Once we have the value, send the battlekey and the battle objectA
//         dispatch(joinSuccessful(battleKey, battle.val()));
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
export function selectRoom(room, updateObj) {
  return {
    type: SELECT_ROOM,
    room,
    updateObj,
  };
}

export const SELECT_ROOM_SUCCESS = 'SELECT_ROOM_SUCCESS';
export function selectRoomSuccess() {
  return {
    type: SELECT_ROOM_SUCCESS,
  };
}

export const SELECT_ROOM_FAILURE = 'SELECT_ROOM_FAILURE';
export function selectRoomFailure(error) {
  return {
    type: SELECT_ROOM_FAILURE,
    error,
  };
}


export const GET_PLAYERS = 'GET_PLAYERS';
export function getPlayers(key) {
  return {
    type: GET_PLAYERS,
    key,
  };
}

export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export function getPlayersSuccess(available) {
  return {
    type: GET_PLAYERS_SUCCESS,
    available,
  };
}

export const GET_PLAYERS_FAILURE = 'GET_PLAYERS_FAILURE';
export function getPlayersFailure(error) {
  return {
    type: GET_PLAYERS_FAILURE,
    error,
  };
}

