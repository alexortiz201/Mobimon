import { combineReducers } from 'redux';
import login from '../page/Login/Login-reducers';

// import battle from './battle';
// import battleSession from './battle-session';
// import pickCharacter from './pick-character';


const reducers = {
//   battle,
//   battleSession,
//   pickCharacter,
  login,
};

const mobimonApp = combineReducers(reducers);

export default mobimonApp;
