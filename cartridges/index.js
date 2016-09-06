/* eslint-disable no-unused-vars */
import React from 'react';
import { IndexRoute } from 'react-router';
/* eslint-enable no-unused-vars */

import {
  loadCartridges,
  registerCartridge,
} from '../core/public/utils/cartridges/cartridges-utils';
import incubator, { connectedIncubator } from './mobimon-incubator/';
import chatRPG from './mobimon-chat-rpg/';

const defaultCartridge = {
  Route: () => <IndexRoute key="defaultCartridge" component={connectedIncubator} />,
};

/**
 * Registers routes, this should just import
 * any mobimon-* folders' index.js file.
 * and return an array the loops through registerCartridge.
 */
const allCartridges = [
  defaultCartridge,
  incubator,
  chatRPG,
];

const globFoldersForCartridges = () => allCartridges;

globFoldersForCartridges().forEach((c) => {
  registerCartridge(c);
});

export const load = () => loadCartridges();

export default { load };
