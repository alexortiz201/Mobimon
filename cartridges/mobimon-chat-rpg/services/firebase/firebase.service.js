import privateConfig from '../../../../private-configs.js';
import { loadScript } from '../../../../core/public/utils/dom/dom-utils';

// const firebaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase.js';
const firebaseAppUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-app.js';
const firebaseDatabaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-database.js';
// const reactFireUrl = 'https://cdn.firebase.com/libs/reactfire/1.0.0/reactfire.min.js';

const connections = {};

let loaded = false;
let inited = false;

let config = privateConfig;
config = config.firebase || {};

export const getDBUrl = () => config.databaseURL;

export const getApiKey = () => config.apiKey;

export const init = () => {
  if (inited) {
    return;
  }

  inited = true;
  firebase.initializeApp(config);
};

export const load = () => {
  if (loaded) {
    return;
  }

  loaded = true;
  loadScript(firebaseAppUrl, loadScript(firebaseDatabaseUrl, init));
};

/**
 * Create a reference to the Firebase url
 * @return {Object} websocket reference
 */
export const createSocketConnection = (infoPath) => {
  if (!connections[infoPath]) {
    connections[infoPath] = firebase.database().ref(infoPath);
  }

  return connections[infoPath];
};

export const getSocketConnection = (infoPath) => connections[infoPath];

export default {
  getDBUrl,
  getApiKey,
  init,
  load,
  createSocketConnection,
  getSocketConnection,
};
