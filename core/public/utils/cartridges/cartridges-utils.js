/** @type {Array} array of loaded cartridges */
let loadedCartridges = [];


/**
 * clear array of cartridges.
 *
 * NOTE: needs to deregister in the future.
 */
export const clearAllCartridges = () => {
  loadedCartridges = [];
};

/**
 * Helper for registering cartridges that will need to get
 * added to loadCartridges Array
 * @param {object} [cartridge]    an object with a path
 * and component field.
 * @return {NoOp}
 */
export const registerCartridge = (cartridge) => {
  if (!cartridge || !cartridge.path || !cartridge.component) {
    return;
  }

  loadedCartridges.push(cartridge);
};

/**
 * Loads all cartridges in cartridges folder
 * @return {array<object>}   array of cartridges
 * with signatures of path and component.
 */
export const loadCartridges = () => loadedCartridges;

export default {
  registerCartridge,
  loadCartridges,
  clearAllCartridges,
};
