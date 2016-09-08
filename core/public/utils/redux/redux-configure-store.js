import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import throttle from 'lodash/throttle';
import app from '../../redux/root-reducer';
import { setItem } from '../storage/storage';

const loggerMiddleware = createLogger();

const middlewareArray = [apiMiddleware, thunkMiddleware, loggerMiddleware];

const mergeStores = (savedState) => {
  const store = createStore(
    app,
    savedState,
    compose(
      applyMiddleware(
        ...middlewareArray
      ),
    ),
  );

  // persist store updates
  store.subscribe(throttle(() => {
    setItem('state', store.getState());
  }, 1000));

  return store;
};

const configureStore = (savedState) => mergeStores(savedState);

export default configureStore;
