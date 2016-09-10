// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
// eslint-disable-next-line no-unused-vars
import { withRouter, IndexRoute } from 'react-router';
import { connect } from 'react-redux';


/* eslint-disable no-unused-vars */
import ChatBattle from './pages/ChatBattle/';
import ChatJoin from './pages/ChatJoin/';
import { createRequire } from '../../core/public/utils/routes/routes-utils';
import allReducers from './redux/';

import { load } from './services/firebase/firebase.service';
import { getRooms } from './redux/session/session-actions';
/* eslint-enable no-unused-vars */

/**
 * array of reducers to be combined into root
 * from cartridges
 */
const path = '/chat-rpg';
const ChatRPG = (props) =>
  <div className="chat-rpg">
    {props.children}
  </div>;

ChatRPG.defaultProps = {};

ChatRPG.propTypes = {};

/**
 * a way to have getRooms wait on the
 * loading of the scripts
 * @return {NoOp}
 */
const prePrep = ({ dispatch }) => {
  load(() => {
    dispatch(getRooms());
  });
};

export const hasBattleKeyEval = (state, replace) => {
  const battleKey = state.chatRPG && state.chatRPG.battleKey;
  const route = battleKey ? `${path}/battle/${battleKey}` : `${path}/join`;
  replace(route);
};

export const connectedChatRPG = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRPG));

export const Route = (store) =>
  <Route
    key={path}
    path={path}
    component={connectedChatRPG}
    onEnter={prePrep(store)}>
    <IndexRoute onEnter={createRequire(store, hasBattleKeyEval)} />
    <Route path="join" component={ChatJoin} />

    <Route path="battle" onEnter={createRequire(store, hasBattleKeyEval)} />
    <Route path="battle/:battleKey" component={ChatBattle} />
  </Route>;

export default {
  Route,
  reducers: allReducers,
  name: 'chatRPG',
};
