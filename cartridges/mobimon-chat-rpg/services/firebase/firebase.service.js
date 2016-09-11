import privateConfig from '../../../../private-configs.js';
import { loadScript } from '../../../../core/public/utils/dom/dom-utils';

const firebaseAppUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-app.js';
const firebaseDatabaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-database.js';

const connections = {};

let config = privateConfig;
config = config.firebase || {};

export const getDBUrl = () => config.databaseURL;

export const getApiKey = () => config.apiKey;

export const init = () => {
  let p;

  if (p) {
    return p;
  }

  p = new Promise((resolve) => {
    firebase.initializeApp(config);
    resolve();
  });

  return p;
};

export const load = () => {
  let p;

  if (p) {
    return p;
  }

  const promiseArray = [];

  const p1 = new Promise((resolve) => {
    loadScript(firebaseAppUrl, () => resolve());
  });

  const p2 = new Promise((resolve) => {
    loadScript(firebaseDatabaseUrl, () => resolve());
  });

  promiseArray.push(p1, p2);

  p = Promise.all(promiseArray);

  return p;
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
