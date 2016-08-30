// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import ChatRoom from './components/ChatRoom/';
import ChatMessages from './components/ChatMessages/';
/* eslint-enable no-unused-vars */

const path = '/chat-rpg';
const chatRPGGreeting = 'Welcome to your Doom!';

const ChatRPG = (props) =>
  <div className="chat-rpg">
    <ChatRoom {...props}>
      <ChatMessages
        messages={props.messages}
        greeting={chatRPGGreeting} />
    </ChatRoom>
  </div>;

const greetingMessage = {
  message: 'Welcome to your Doom!',
  character: {
    name: 'octobruise',
  },
};

ChatRPG.defaultProps = {
  messages: [greetingMessage],
};

ChatRPG.propTypes = {
  messages: PropTypes.array,
};

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
