import {
  loadCartridges,
  registerCartridge,
} from '../core/public/utils/cartridges/cartridges-utils';
import incubatorRoute from './mobimon-incubator/';

registerCartridge(incubatorRoute);

const load = () => loadCartridges();

export default { load };
