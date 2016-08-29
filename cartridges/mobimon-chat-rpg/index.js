import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createChatRPG from './Chat-RPG.js';
import './Chat-RPG.less';

// import createCharacter from '../../core/public/components/Character/';

const path = '/chat-rpg';
// const deps = [React];


const ChatRPG = createChatRPG(React);

const render = ({ userCharacter = {} }) => {
  const name = userCharacter.name && userCharacter.name.toLowerCase();

  if (!name) {
    return (<div />);
  }

  return (
    <div className="chat-rpg">{name}</div>
  );
};

ChatRPG.defaultProps = {
  userCharacter: {},
  render,
};

ChatRPG.propTypes = {
  userCharacter: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

const connectedChatRPG = withRouter(connect((state) => ({
  userCharacter: state.character,
}), {})(ChatRPG));

const Route = {
  path,
  component: connectedChatRPG,
};

export default Route;
