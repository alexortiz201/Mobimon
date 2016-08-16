/**
 * Reduce boilerplate in redux for action creators
 * @param  {string}    type       Action type
 * @param  {List}      argNames   spread rest of args
 * @return {Function}             function that when called
 * returns object with type and appended args
 */
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export default { makeActionCreator };
