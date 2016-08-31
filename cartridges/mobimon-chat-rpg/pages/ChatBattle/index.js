// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import ChatRoom from '../../components/ChatRoom/';
import ChatMessages from '../../components/ChatMessages/';
/* eslint-enable no-unused-vars */

import './ChatBattle.less';

const chatRPGGreeting = 'Welcome to your Doom!';

const ChatBattle = (props) =>
  <div className="chat-battle">
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

ChatBattle.defaultProps = {
  messages: [greetingMessage],
};

ChatBattle.propTypes = {
  messages: PropTypes.array,
};

const connectedChatBattle = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatBattle));

export default connectedChatBattle;
