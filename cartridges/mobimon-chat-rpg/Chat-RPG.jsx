// eslint-disable-next-line no-unused-vars
import React from 'react';

const chatRpg = (props) =>
  <div className="chat-rpg-container">
    {props.render(props)}
  </div>;

export default chatRpg;
