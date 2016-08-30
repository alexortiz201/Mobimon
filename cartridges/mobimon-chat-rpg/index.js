// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import ChatRoom from './components/ChatRoom/';
import SpeechBubble from './components/SpeechBubble/';
/* eslint-enable no-unused-vars */

const path = '/chat-rpg';

const ChatRPG = (props) =>
  <div className="chat-rpg">
    <ChatRoom {...props}>
      <div className="chat-rpg-messages">
        <SpeechBubble {...props} />
      </div>
    </ChatRoom>
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
