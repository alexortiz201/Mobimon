/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Main from '../../page/Main/';
import About from '../../page/About/';
import Login from '../../page/Login/';
import Logout from '../../page/Logout/';
import Pick from '../../page/Pick/';
import Cartridges from '../../../../cartridges/';

const cartridges = Cartridges.load();

const Routes = {
  childRoutes: [
    {
      path: '/',
      component: Main,
      childRoutes: cartridges,
    },
    {
      path: '/pick',
      component: Pick,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/logout',
      component: Logout,
    },
  ],
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
/* eslint-enable no-unused-vars */
