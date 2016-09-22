// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
// eslint-disable-next-line no-unused-vars
import { withRouter, IndexRoute } from 'react-router';
import { connect } from 'react-redux';


/* eslint-disable no-unused-vars */
import ChatBattle from './pages/ChatBattle/';
import ChatJoin from './pages/ChatJoin/';
import {
  createOnEnter,
  createOnLeave,
} from '../../core/public/utils/routes/routes-utils';
import { leaveRoom } from './redux/session/session-actions';

import allReducers from './redux/';
/* eslint-enable no-unused-vars */

/**
 * array of reducers to be combined into root
 * from cartridges
 */
const path = '/chat-rpg';
const ChatRPG = props =>
  <div className="chat-rpg">
    {props.children}
  </div>;

ChatRPG.defaultProps = {};
ChatRPG.propTypes = {};

export const exitRoom = (store) => {
  const state = store.getState();
  const key = state.chatRPG && state.chatRPG.room.key;
  const userName = state.user.name;
  store.dispatch(leaveRoom({ key }, userName));
};

export const requireBattleKeyEval = (store, replace) => {
  const state = store.getState();
  const roomKey = state.chatRPG && state.chatRPG.room.key;
  const route = roomKey ? `${path}/battle/${roomKey}` : `${path}/join`;
  replace(route);
};

export const connectedChatRPG = withRouter(connect(state => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRPG));

export const Route = store =>
  <Route
    key={path}
    path={path}
    component={connectedChatRPG}>
    <IndexRoute onEnter={createOnEnter(store, requireBattleKeyEval)} />
    <Route path="join" component={ChatJoin} />

    <Route path="battle" onEnter={createOnEnter(store, requireBattleKeyEval)} />
    <Route
      path="battle/:battleKey"
      component={ChatBattle}
      onLeave={createOnLeave(store, exitRoom)} />
  </Route>;

export default {
  Route,
  reducers: allReducers,
  name: 'chatRPG',
};
