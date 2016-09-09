import { createStore, applyMiddleware, compose } from 'redux';
import { install } from 'redux-loop';
// import { apiMiddleware } from 'redux-api-middleware';
// import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import throttle from 'lodash/throttle';
import app from '../../redux/root-reducer';
import { setItem } from '../storage/storage';

const loggerMiddleware = createLogger();

// apiMiddleware, thunkMiddleware,
const middlewareArray = [loggerMiddleware];
const enhancer = compose(
  applyMiddleware(...middlewareArray),
  install(),
);

const mergeStores = (savedState) => {
  const store = createStore(
    app,
    savedState,
    enhancer,
  );

  // persist store updates
  store.subscribe(throttle(() => {
    setItem('state', store.getState());
  }, 1000));

  return store;
};

const configureStore = (savedState) => mergeStores(savedState);

export default configureStore;
