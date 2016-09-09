import { combineReducers } from 'redux-loop';
import user from './user/user-reducers';
import character from './character/character-reducers';

import { load } from '../../../cartridges/';

const cartridges = load();
const cartridgeReducers = {};

cartridges.forEach(({ name, reducers }) => {
  if (reducers && Object.keys(reducers).length) {
    cartridgeReducers[name] = combineReducers(reducers);
  }
});

// debugger // eslint-disable-line
const reducers = {
  user,
  character,
  ...cartridgeReducers,
};

const core = combineReducers(reducers);

export default core;
