/**
 * Captures store in closure to later use on enter, and
 * inverts function evaluation.
 * @param  {Object} store  [description]
 * @param  {Function} evalFn      callback
 * @return {Function}        Function that takes state
 */
export const createOnEnter = (store, evalFn) =>
  (nextState, replace) => evalFn(store, replace);

/**
 * Captures store in closure to later use on leave, and
 * inverts function evaluation.
 * @param  {Object} store  [description]
 * @param  {Function} evalFn      callback
 * @return {Function}        Function that takes state
 */
export const createOnLeave = (store, evalFn) =>
  () => evalFn(store);


/**
 * These common route pre checks functions
 */

/** Evalute user is signed in */
export const loggedInEval = (store, replace) => {
  const state = store.getState();
  const loggedIn = state.user && state.user.loggedIn;

  if (!loggedIn) {
    replace('/login');
  }
};

export const characterChoosenEval = (store, replace) => {
  const state = store.getState();
  const charChosen = state.character && state.character.name;

  if (!charChosen) {
    replace('/pick');
  }
};

export default {
  createOnEnter,
  createOnLeave,
  loggedInEval,
  characterChoosenEval,
};

