/* eslint-disable no-unused-vars */
import React from 'react';
import { IndexRoute } from 'react-router';
/* eslint-enable no-unused-vars */

import {
  loadCartridges,
  registerCartridge,
} from '../core/public/utils/cartridges/cartridges-utils';
import incubatorRoute, { connectedIncubator } from './mobimon-incubator/';
import chatRPGRoute from './mobimon-chat-rpg/';

const defaultCartridge = () =>
  <IndexRoute key="defaultCartridge" component={connectedIncubator} />;

/**
 * Registers routes, this should just import
 * any mobimon-* folders' index.js file.
 * and return an array the loops through registerCartridge.
 */
const allCartridges = [
  defaultCartridge,
  incubatorRoute,
  chatRPGRoute,
];

const globFoldersForCartridges = () => allCartridges;

globFoldersForCartridges().forEach((route) => {
  registerCartridge(route);
});

const load = () => loadCartridges();

export default { load };
