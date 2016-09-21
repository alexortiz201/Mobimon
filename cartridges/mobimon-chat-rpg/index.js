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

// export const triggerRoomLeft = (store) => {
//   const state = store.getState();
//   const userName = state.user.name;

//   // submit spliced updateObj,
//   // after removing self from list.
//   console.log(state, userName);
//   debugger // eslint-disable-line
//   // leaveRoom()
// };

export const requireBattleKeyEval = (store, replace) => {
  const state = store.getState();
  const battleKey = state.chatRPG && state.chatRPG.battleKey;
  const route = battleKey ? `${path}/battle/${battleKey}` : `${path}/join`;
  replace(route);
};

export const connectedChatRPG = withRouter(connect(state => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRPG));

// onEnter={createOnLeave(store, triggerRoomLeft)}
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
      component={ChatBattle} />
  </Route>;

export default {
  Route,
  reducers: allReducers,
  name: 'chatRPG',
};
