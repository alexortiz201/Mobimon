// eslint-disable-next-line no-unused-vars
import React from 'react';

const chatRoom = ({ userName = '', userCharacter = {} }) =>
  <div className="chat-room">
    {userName} : {userCharacter.name}
  </div>;

export default chatRoom;
