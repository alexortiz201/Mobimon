/** @type {Array} array of loaded cartridges */
export const loadedCartridges = [];

/**
 * Helper for registering cartridges that will need to get
 * added to loadCartridges array
 * @param {object} [cartridge]    an object with a path
 * and component field.
 * @return {NoOp}
 */
export const registerCartidge = (cartridge) => {
  if (!cartridge || cartridge.path || cartridge.component) {
    return;
  }

  loadedCartridges.push(cartridge);
};

/**
 * Loads all cartridges in cartridges folder
 * @return {array<object>}   array of cartridges
 * with signatures of path and component.
 */
export const loadCartridges = () => {
  console.log('cartridges loaded: ', loadedCartridges);
  return loadedCartridges;
};

export default {
  loadedCartridges,
  registerCartidge,
  loadCartridges,
};
