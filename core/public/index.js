/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './utils/redux/configureStore';
import Root from './components/Root/Root';

const store = configureStore();

render(<Root store={store} />, document.getElementById('app'));
/* eslint-enable no-unused-vars */
