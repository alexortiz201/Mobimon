/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import {
  createRequire,
  loggedInEval,
  characterChoosenEval,
} from '../../utils/routes/routes-utils';

import Main from '../../pages/Main/';
import About from '../../pages/About/';
import Login from '../../pages/Login/';
import Logout from '../../pages/Logout/';
import Pick from '../../pages/Pick/';
import { load } from '../../../../cartridges/';

const cartridges = load();

const Root = ({ store }) => {
  // Route is a React object needs to be capitalized
  // eslint-disable-next-line new-cap
  const cartridgesRoutes = cartridges.map(c => c.Route(store));
  const requireLogin = createRequire(store, loggedInEval);
  const requireCharacter = createRequire(store, characterChoosenEval);

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
