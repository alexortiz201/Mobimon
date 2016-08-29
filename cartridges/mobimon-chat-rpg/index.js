// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import ChatRoom from './components/ChatRoom/';

// import createCharacter from '../../core/public/components/Character/';

const path = '/chat-rpg';
// const deps = [React];

const ChatRPG = (props) =>
  <div className="chat-rpg">
    <ChatRoom {...props} />
  </div>;

// ChatRPG.defaultProps = {};

// ChatRPG.propTypes = {};

const connectedChatRPG = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRPG));

const Route = {
  path,
  component: connectedChatRPG,
  childRoutes: [],
};

export default Route;
