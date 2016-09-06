import { combineReducers } from 'redux';
import user from './user/user-reducers';
import character from './character/character-reducers';

import { load } from '../../../cartridges/';

const cartridgeReducers = load().map(c => c.reducers);
const reducers = {
  user,
  character,
  ...cartridgeReducers,
};

const core = combineReducers(reducers);

export default core;
