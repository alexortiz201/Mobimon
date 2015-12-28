import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

// Components
import App from './Main';
import JoinGame from './JoinGame/JoinGame';
import BattleScene from './BattleScene/BattleScene';
import PickCharacter from './PickCharacter/PickCharacter';
import Login from './Login/Login';
import MessageList from './BattleScene/MessageList';
import Tabs from './Tabs';

import rootReducer from '../reducers/index';
import { createStoreWithMiddleware } from '../stores/create-store';

const store = createStoreWithMiddleware(rootReducer);

// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="battle/:battleKey" component={BattleScene}/>
        <Route path="join" component={JoinGame} />
        <Route path="pick" component={PickCharacter} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
