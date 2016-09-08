import {
  SELECT_BATTLE,
  REQUEST_BATTLES,
  RECEIVE_BATTLES,
  JOINING_BATTLE,
  JOIN_SUCCESSFUL,
} from '../actions/battle';

const initialState = {
  currentBattleKey: '',
  currentBattleSession: {
    attendees: []
  }
};

export default function battle(state = initialState, action) {
  let payload = action.payload;
  switch(action.type) {
  case SELECT_BATTLE:
    return {
      ...state,
      currentBattle: payload.currentBattle
    };

  case REQUEST_BATTLES:
    return {
      ...state,
      requestingBattles: true
    };

  case RECEIVE_BATTLES:
    return {
      ...state,
      battles: payload.battles
    };

  case JOINING_BATTLE:
    return {
      ...state,
      joiningBattle: payload.joiningBattle
    };

  case JOIN_SUCCESSFUL:
    return {
      ...state,
      currentBattleKey: payload.currentBattleKey,
      currentBattleSession: payload.currentBattleSession,
      joined: true
    };
  default:
    return state;
  }
}
