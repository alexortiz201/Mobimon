import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createChatRPG from './Chat-RPG.js';
import './Chat-RPG.less';

// import createCharacter from '../../core/public/components/Character/';

const path = '/chat-rpg';
// const deps = [React];


const ChatRPG = createChatRPG(React);

const render = ({ userName = '', userCharacter = {} }) => {
  const name = userCharacter.name && userCharacter.name.toLowerCase();

  if (!name) {
    return (<div />);
  }

  return (
    <div className="chat-rpg">
      {userName} : {name}
    </div>
  );
};

ChatRPG.defaultProps = {
  userName: '',
  userCharacter: {},
  render,
};

ChatRPG.propTypes = {
  userName: PropTypes.string.isRequired,
  userCharacter: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
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
