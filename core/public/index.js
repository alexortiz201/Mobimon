/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './utils/redux/redux-configure-store.js';
import Root from './components/Root/Root';
import { getItem } from './utils/storage/storage';

getItem('state').then((result) => {
  // localStorage respons with null if non existant
  const savedState = result !== null ? result : {};

  const store = configureStore(savedState);

  render(<Root store={store} />, document.getElementById('app'));
});
/* eslint-enable no-unused-vars */
