import {
  loadCartridges,
  registerCartridge,
} from '../core/public/utils/cartridges/cartridges-utils';
import incubatorRoute from './mobimon-incubator/';

/**
 * Registers routes, this should just import
 * any mobimon-* folders' index.js file.
 * and return an array the loops through registerCartridge.
 */
const allCartridges = [incubatorRoute];

const globFoldersForCartridges = () => allCartridges;

globFoldersForCartridges().forEach((route) => {
  registerCartridge(route);
});

const load = () => loadCartridges();

export default { load };
