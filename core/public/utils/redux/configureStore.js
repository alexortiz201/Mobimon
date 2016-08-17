import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import throttle from 'lodash/throttle';
import mobimonApp from '../../reducers/root-reducer';
import { setItem } from '../storage/storage';

const loggerMiddleware = createLogger();

const mergeStores = (savedState) => {
  const newCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )(createStore);

  const store = newCreateStore(
    mobimonApp,
    savedState,
  );

  // persist store updates
  store.subscribe(throttle(() => {
    setItem('state', store.getState());
  }, 1000));

  return store;
};

// const checkPersistedStore = () => getItem('state');

const configureStore = (savedState) => {
  const configedStore = mergeStores(savedState);
  return configedStore;
};

export default configureStore;
