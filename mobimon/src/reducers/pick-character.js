import {
  REQUEST_CHARACTERS,
  RECEIVE_CHARACTERS,
  PICK_CHARACTER
} from '../actions/pick-character';

const characters = [];
const initialState = {
  characters,
};

export default function pickCharacter(state = initialState, action) {
  let payload = action.payload;

  switch(action.type) {
  case REQUEST_CHARACTERS:
    return {
      ...state,
      requestingCharacters: true
    };

  case RECEIVE_CHARACTERS:
    return {
      ...state,
      characters: payload.characters
    };

  case PICK_CHARACTER:
    return {
      ...state,
      selectedCharacter: payload.character
    };

  default:
    return state;
  }
}
