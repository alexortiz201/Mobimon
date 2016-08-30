// eslint-disable-next-line no-unused-vars
import React from 'react';

const speechBubble = ({
  userName = '',
  character = '',
  message = '',
  renderCharacter = () => {},
}) =>
  <div className="speech-bubble">
    {renderCharacter(character)}
    <span className="speech-bubble-message">
      <span className="message-speaker">
        {userName && `${userName}: `}
      </span>
      <span className="message-spoken">
        {message}
      </span>
    </span>
  </div>;

export default speechBubble;
