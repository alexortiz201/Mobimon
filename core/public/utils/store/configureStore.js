import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import mobimonApp from '../../reducers/root-reducer';

const loggerMiddleware = createLogger();
const configureStore = () => {
  const newCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )(createStore);

  const store = newCreateStore(mobimonApp);

  return store;
};


export default configureStore;
