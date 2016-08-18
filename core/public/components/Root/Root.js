/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Main from '../../page/Main/';
import About from '../../page/About/';
import Login from '../../page/Login/';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    {/*
      <Route path="/logout" component={Logout} />
      <Route path="/pick" component={PickCharacter} />
    */}
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
/* eslint-enable no-unused-vars */
