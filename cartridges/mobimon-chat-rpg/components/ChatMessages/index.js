import React, { PropTypes } from 'react';
import uuid from 'node-uuid';
import createChatMessages from './ChatMessages.js';
// eslint-disable-next-line no-unused-vars
import SpeechBubble from '../SpeechBubble/';
import './ChatMessages.less';

const ChatMessages = createChatMessages(React);

const renderMessages = (messages) => {
  const messagesJSX = messages.map((message) => <SpeechBubble
          {...message}
          key={uuid.v1()} />);

  return (messagesJSX);
};

ChatMessages.defaultProps = {
  messages: [],
  renderMessages,
};

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  renderMessages: PropTypes.func.isRequired,
};

export default ChatMessages;
