import { combineReducers } from 'redux';
import user from './user/user-reducers';

// import battle from './battle';
// import battleSession from './battle-session';
// import pickCharacter from './pick-character';


const reducers = {
//   battle,
//   battleSession,
//   pickCharacter,
  user,
};

const mobimonApp = combineReducers(reducers);

export default mobimonApp;
