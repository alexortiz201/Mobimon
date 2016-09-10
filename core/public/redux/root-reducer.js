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

const reducers = {
  user,
  character,
  ...cartridgeReducers,
};

const core = combineReducers(reducers);

/**
 * workaround for hijacking logout,
 * reset all state.
 * @param  {Object} state
 * @param  {Object} action
 * @return {function} core  rootReducer
 */
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    // eslint-disable-next-line
    state = undefined;
  }

  return core(state, action);
};

export default rootReducer;
