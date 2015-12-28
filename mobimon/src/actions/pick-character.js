import {
  FireBaseUrl,
  UserName,
  Characters
} from '../utils/constants';

// ACTIONS
export const REQUEST_CHARACTERS = 'REQUEST_CHARACTERS';

export function requestCharacters() {
  return {
    type: REQUEST_CHARACTERS,
    payload:  {
      requestingCharacters: true
    }
  }
}

export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';

export function receiveCharacters(characters) {
  return {
    type: RECEIVE_CHARACTERS,
    payload: {
    	characters
    }
  }
}

export const PICK_CHARACTER = 'PICK_CHARACTER';

export function pickCharacter(character) {
  return {
    type: PICK_CHARACTER,
    payload: {
    	character
    }
  }
}

export const FETCH_CHARACTERS = 'FETCH_CHARACTERS';

// Thunk for atually fetching battles
export function fetchCharacters() {
  return function (dispatch) {
    // dispatch that the app is requesting battles
    dispatch(receiveCharacters(Characters));
  };
}