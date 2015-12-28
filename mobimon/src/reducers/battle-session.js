import {
  RECEIVE_MESSAGES,
  PLAYER_TAB_SELECTED,
  LOADED_CHARACTER,
  DECLARE_HOST,
  GAME_STARTED,
  GAME_STARTING,
  SET_RECEIVED_MESSAGES,
  DISPATCHED_MESSAGES
} from '../actions/battle-session';

export default function battleSession(state = {}, action) {
  let payload = action.payload;
  switch(action.type) {
  case RECEIVE_MESSAGES:
    return {
      ...state,
      messages: payload.messages
    };

  case PLAYER_TAB_SELECTED:
    return {
      ...state,
      selectedPlayerTab: payload.selectedPlayerTab
    };

  case LOADED_CHARACTER:
    return {
      ...state,
      storedCharacter: payload.storedCharacter
    };

  case DECLARE_HOST:
    return {
      ...state,
      host: payload.userName
    };

  case DISPATCHED_MESSAGES:
    return {
      ...state,
      dispatchedMessages: payload.dispatchedMessages
    };

  case GAME_STARTED:
    return {
      ...state,
      gameStarted: true,
      gameStarting: false
    };

  case GAME_STARTING:
    return {
      ...state,
      gameStarting: true
    };

  case SET_RECEIVED_MESSAGES:
    return {
      ...state,
      receivedMessages: payload.receivedMessages
    };
  default:
    return state;
  }
}
