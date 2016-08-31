/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Main from '../../pages/Main/';
import About from '../../pages/About/';
import Login from '../../pages/Login/';
import Logout from '../../pages/Logout/';
import Pick from '../../pages/Pick/';
import Cartridges from '../../../../cartridges/';

const cartridges = Cartridges.load();
const cartridgesRoutes = cartridges.map((c) => c());

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        {cartridgesRoutes}
      </Route>
      <Route path="/about" component={About} />
      <Route path="/pick" component={Pick} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
/* eslint-enable no-unused-vars */
