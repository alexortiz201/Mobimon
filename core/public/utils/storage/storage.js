import localforage from 'localforage';

const localforageConfig = {
  name: Mobimon,
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
localforage.config(localforageConfig);

/**
 * Loads any saved state using localforage
 * @return {object|undefined} state   Saved or undefined.
 *
 * NOTE: Objects are truthy, in order for redux to populate
 * state by default, it needs to be falsy.
 */
const loadState = () => {
  localforage.getItems()
    .then(state => {
      // return undef if there is no saved state found.
      if (!Object.keys(state).length) {
        return undefined;
      }

      return state;
    })
    .catch(err => {
      return undefined;
    });
};

// TODO
const saveState = (state) +> {
  return undefined;
};

export default { loadState, saveState };
