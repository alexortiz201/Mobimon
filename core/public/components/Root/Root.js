/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import routeHelpers from '../../utils/routes/routes-utils';

import Main from '../../pages/Main/';
import About from '../../pages/About/';
import Login from '../../pages/Login/';
import Logout from '../../pages/Logout/';
import Pick from '../../pages/Pick/';
import Cartridges from '../../../../cartridges/';

const cartridges = Cartridges.load();
const cartridgesRoutes = cartridges.map((c) => c());

const loggedInEval = (state, replace) => {
  const loggedIn = state.user && state.user.loggedIn;

  if (!loggedIn) {
    replace('/login');
  }
};

const characterChoosenEval = (state, replace) => {
  const charChosen = state.character && state.character.name;

  if (!charChosen) {
    replace('/pick');
  }
};

const Root = ({ store }) => {
  const requireLogin = routeHelpers.createRequire(store, loggedInEval);
  const requireCharacter = routeHelpers.createRequire(store, characterChoosenEval);

  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main} onEnter={requireCharacter}>
          {cartridgesRoutes}
        </Route>
        <Route path="/pick" component={Pick} onEnter={requireLogin} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
/* eslint-enable no-unused-vars */
