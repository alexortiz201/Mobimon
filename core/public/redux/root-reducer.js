import { combineReducers } from 'redux';
import user from './user/user-reducers';
import character from './character/character-reducers';

// import battle from './battle';
// import battleSession from './battle-session';


const reducers = {
//   battle,
//   battleSession,
  user,
  character,
};

const mobimonApp = combineReducers(reducers);

export default mobimonApp;
