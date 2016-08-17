import localForage from 'localforage';
import localforageGetItems from 'localforage-getitems';

const localForageConfig = {
  name: 'Mobimon',
};

/**
 * localforage config must run before any other calls
 * to localforage.
 *
 * NOTE: localforge getItem() plugin allows for retrieval of
 * all the items of the current driver instance when null or
 * no args are passed to getItems. Otherwise takes an array
 * of keys to look up values for.
 */
localForage.config(localForageConfig);

/**
 * Loads any saved state using localforage
 * @return {Promise}
 *
 * NOTE: Objects are truthy, in order for redux to populate
 * state by default, it needs to be falsy.
 */
const loadState = () =>
  localForage.getItems()
    .then(state => {
      // return undef if there is no saved state found.
      if (!Object.keys(state).length) {
        return undefined;
      }

      return state;
    })
    .catch(err => undefined); // eslint-disable-line no-unused-vars

/**
 * Clear any stored keys
 * @return {Promise}
 */
const clearState = () =>
  localForage.clear()
    .catch(err => undefined);

/**
 * get single stored item
 * @param  {string} key   key string value
 * @return {Promise}
 */
const getItem = (key) => localForage.getItem(key);

/**
 * get array of stored items
 * @param  {array<string>} keysArray   array of key string values
 * @return {Promise}  that resloves to object with key value pairs
 */
const getItems = (keysArray) => localForage.getItems(keysArray);

/**
 * save single stored item
 * @param  {string} key   key string value
 * @return {Promise}
 */
const setItem = (key, value) => localForage.setItem(key, value);

/**
 * remove single stored item
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
const removeItem = (key) => localForage.removeItem(key);

// const getDBLength = () => localForage.length().then(numberOfKeys => numberOfKeys);
// const getKeyNameById = (id) => localForage.key(id).then(keyName => keyName);
// const getAllKeys = () => localForage.keys().then(keys => keys);
// const iterate = () =>
// localForage.iterate().then((value, key, iterationNumber) => { value, key, iterationNumber });


export {
  loadState,
  clearState,
  getItem,
  getItems,
  setItem,
  removeItem,
};
