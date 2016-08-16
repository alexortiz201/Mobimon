import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import mobimonApp from '../../reducers/root-reducer';
// import { loadState } from '../storage/storage';

const loggerMiddleware = createLogger();
const configureStore = () => {
  const newCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )(createStore);

  const persistedState = {}; // loadState();
  const store = newCreateStore(
    mobimonApp,
    persistedState,
  );

  return store;
};


export default configureStore;
