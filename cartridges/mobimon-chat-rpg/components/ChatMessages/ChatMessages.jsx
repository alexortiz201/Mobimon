// eslint-disable-next-line no-unused-vars
import React from 'react';

const chatMessages = ({
  messages = [],
  greeting = '',
  renderMessages = () => {},
}) => <div className="chat-rpg-messages">
    {
      !messages.length ?
      <h3 className="chat-rpg-greeting">{greeting}</h3> :
      <div className="chat-rpg-message-list">
        {renderMessages(messages)}
      </div>
    }
  </div>;

export default chatMessages;
