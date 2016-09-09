import privateConfig from '../../../../private-configs.js';
import { loadScript } from '../../../../core/public/utils/dom/dom-utils';

const firebaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase.js';
const firebaseAppUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-app.js';
// const reactFireUrl = 'https://cdn.firebase.com/libs/reactfire/1.0.0/reactfire.min.js';

let config = privateConfig;
config = config.firebase || {};

export const getDBUrl = () => config.databaseURL;

export const getApiKey = () => config.apiKey;

export const init = () => firebase.initializeApp(config);

export const load = () =>
  loadScript(firebaseUrl, loadScript(firebaseAppUrl, init));

/**
 * Create a reference to the Firebase url
 * @return {Object} websocket reference
 */
export const createSocketConnection = () => {
  debugger // eslint-disable-line
  // return firebase(`${getDBUrl()}${path}`);
};

export default {
  getDBUrl,
  getApiKey,
  init,
  load,
  createSocketConnection,
};
