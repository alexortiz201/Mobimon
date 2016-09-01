/**
 * Captures store in closure to later use on enter, and
 * inverts function evaluation.
 * @param  {Object} store  [description]
 * @param  {Function} evalFn      callback
 * @return {Function}        Function that takes state
 */
export const createRequire = (store, evalFn) =>
  (nextState, replace) => evalFn(store.getState(), replace);


/**
 * These common route pre checks functions
 */

/** Evalute user is signed in */
export const loggedInEval = (state, replace) => {
  const loggedIn = state.user && state.user.loggedIn;

  if (!loggedIn) {
    replace('/login');
  }
};

export const characterChoosenEval = (state, replace) => {
  const charChosen = state.character && state.character.name;

  if (!charChosen) {
    replace('/pick');
  }
};

export default {
  createRequire,
  loggedInEval,
  characterChoosenEval,
};

