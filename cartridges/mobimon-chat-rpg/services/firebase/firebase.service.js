import privateConfig from '../../../../private-configs.js';
import { loadScript } from '../../../../core/public/utils/dom/dom-utils';

const firebaseAppUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-app.js';
const firebaseDatabaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-database.js';

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

export const load = (cb) => {
  if (loaded) {
    return;
  }

  loaded = true;
  loadScript(firebaseAppUrl);
  loadScript(firebaseDatabaseUrl, () => {
    init();
    cb();
  });
};

/**
 * Create a reference to the Firebase url
 * @return {Object} websocket reference
 */
export const createDatabaseRef = (infoPath) => {
  if (!connections[infoPath]) {
    connections[infoPath] = firebase.database().ref(infoPath);
  }

  return connections[infoPath];
};

export const getDatabaseRef = (infoPath) => connections[infoPath];

export default {
  getDBUrl,
  getApiKey,
  init,
  load,
  createDatabaseRef,
  getDatabaseRef,
};
