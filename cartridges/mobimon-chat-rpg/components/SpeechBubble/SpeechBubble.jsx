// eslint-disable-next-line no-unused-vars
import React from 'react';

const speechBubble = ({
  userName = '',
  message = '',
  renderCharacter = () => {},
}) =>
  <div className="speech-bubble">
    {renderCharacter()}
    <span className="speech-bubble-message">{userName} : {message}</span>
  </div>;

export default speechBubble;
