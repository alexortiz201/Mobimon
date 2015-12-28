// This is where all the individual reducers are combined.
import {combineReducers} from 'redux';

// Import reducers here
import battle from './battle';
import battleSession from './battle-session';
import pickCharacter from './pick-character';
import login from './login.js';

export default combineReducers({
  battle,
  battleSession,
  pickCharacter,
  login
});
