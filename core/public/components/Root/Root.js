/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Main from '../../page/Main/Main';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
/* eslint-enable */
