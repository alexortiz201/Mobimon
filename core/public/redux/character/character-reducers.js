import { SELECT_CHARACTER } from './character-actions';

const initialState = {};
const character = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...action.character,
      };
    default:
      return state;
  }
};

export default character;
