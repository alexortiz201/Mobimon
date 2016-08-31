/**
 * Captures store in closure to later use on enter, and
 * inverts function evaluation.
 * @param  {Object} store  [description]
 * @param  {Function} evalFn      callback
 * @return {Function}        Function that takes state
 */
const createRequire = (store, evalFn) =>
  (nextState, replace) => evalFn(store.getState(), replace);

export default {
  createRequire,
};

