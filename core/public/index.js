/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import { createHashHistory } from 'history';
import Main from './page/Main/Main';

render((
    <Router history={browserHistory}>
      <Route path="/" component={Main}></Route>
    </Router>
), document.getElementById('app'));
/* eslint-enable */
