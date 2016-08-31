// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import ChatBattle from './pages/ChatBattle/';
/* eslint-enable no-unused-vars */

const path = 'chat-rpg';

const ChatRPG = (props) =>
  <div className="chat-rpg">
    {props.children}
  </div>;

ChatRPG.defaultProps = {};

ChatRPG.propTypes = {};

const connectedChatRPG = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRPG));

const Route = () =>
  <Route key={path} path={path} component={connectedChatRPG}>
    <Route path="battle" component={ChatBattle} />
  </Route>;

export default Route;
