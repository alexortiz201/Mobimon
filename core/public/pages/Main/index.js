import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import 'normalize.css';

import createMain from './Main.js';
import './Main.less';

import createTopBar from '../../components/TopBar/';
import createButton from '../../components/Button/';
import createCharacter from '../../components/Character/';

const Main = createMain(React);
/* eslint-disable no-unused-vars */
const Character = createCharacter(React);
const TopBar = createTopBar(React);
const Button = createButton(React);
/* eslint-enable no-unused-vars */

const goToLogin = props => props.router.replace('/login');
const goToChatRPG = props => props.router.replace('/chat-rpg');

const renderTopBar = (props) => {
  const { user = {}, character = {} } = props;
  const name = character.name && character.name.toLowerCase();

  if (!name) {
    return (<div />);
  }

  return (
    <TopBar>
      <Character
        character={character}
        className={character.name.toLowerCase()} />
      <span className="top-bar-name">{`${user.name}`}</span>
      <Button
        className="top-bar-nav"
        text="Battle RPG Arena"
        onClick={() => goToChatRPG(props)} />
    </TopBar>
  );
};

Main.defaultProps = {
  user: {},
  character: {},
  goToLogin,
  goToChatRPG,
  renderTopBar,
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  goToLogin: PropTypes.func.isRequired,
  goToChatRPG: PropTypes.func.isRequired,
  renderTopBar: PropTypes.func.isRequired,
};

const connectedMain = connect(state => ({
  user: state.user,
  character: state.character,
}), {})(Main);

export default withRouter(connectedMain);
