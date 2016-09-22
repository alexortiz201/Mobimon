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

// This also creates a room if non-existing.
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

export const LEAVE_ROOM = 'LEAVE_ROOM';
export function leaveRoom(room, userName) {
  return {
    type: LEAVE_ROOM,
    room,
    userName,
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

export const REMOVE_PLAYERS = 'REMOVE_PLAYERS';
export function removePlayers(roomKey, playerNames = []) {
  return {
    type: REMOVE_PLAYERS,
    roomKey,
    playerNames,
  };
}

export const REMOVE_PLAYERS_SUCCESS = 'REMOVE_PLAYERS_SUCCESS';
export function removePlayersSuccess() {
  return {
    type: REMOVE_PLAYERS_SUCCESS,
  };
}

export const REMOVE_PLAYERS_FAILURE = 'REMOVE_PLAYERS_FAILURE';
export function removePlayersFailure(error) {
  return {
    type: REMOVE_PLAYERS_FAILURE,
    error,
  };
}

