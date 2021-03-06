import privateConfig from '../../../../private-configs.js';
import { loadScript } from '../../../../core/public/utils/dom/dom-utils';

const firebaseAppUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-app.js';
const firebaseDatabaseUrl = 'https://www.gstatic.com/firebasejs/3.3.0/firebase-database.js';

const connections = {};

let config = privateConfig;
let loadPromise;
let initPromise;

config = config.firebase || {};

export const getDBUrl = () => config.databaseURL;

export const getApiKey = () => config.apiKey;

export const init = () => {
  if (initPromise) {
    return initPromise;
  }

  initPromise = new Promise((resolve) => {
    firebase.initializeApp(config);
    resolve();
  });

  return initPromise;
};

export const load = () => {
  if (loadPromise) {
    return loadPromise;
  }

  const promiseArray = [];

  const p1 = new Promise((resolve) => {
    loadScript(firebaseAppUrl, () => resolve());
  });

  const p2 = new Promise((resolve) => {
    loadScript(firebaseDatabaseUrl, () => resolve());
  });

  promiseArray.push(p1, p2);

  loadPromise = Promise.all(promiseArray);

  return loadPromise;
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

export const getDatabaseRef = infoPath => connections[infoPath];

export function fetchFromFirebase(resource, successFn, failFn) {
  return createDatabaseRef(resource)
    .once('value')
    .then(FirebaseObj => FirebaseObj.val())
    .then(successFn)
    .catch(failFn);
}


export function updateFirebase(resource, updateObj, successFn, failFn) {
  return createDatabaseRef(resource)
    .update(updateObj)
    .then(successFn)
    .catch(failFn);
}

export function setFirebase(resource, updateObj, successFn, failFn) {
  return createDatabaseRef(resource)
    .set(updateObj)
    .then(successFn)
    .catch(failFn);
}

export default {
  getDBUrl,
  getApiKey,
  init,
  load,
  createDatabaseRef,
  getDatabaseRef,
  fetchFromFirebase,
  updateFirebase,
  setFirebase,
};
