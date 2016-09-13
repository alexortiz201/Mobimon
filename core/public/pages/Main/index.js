import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import 'normalize.css';

import createMain from './Main.js';
import './Main.less';

import createCharacter from '../../components/Character/';

const Main = createMain(React);
// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

const goToLogin = props => props.router.replace('/login');

const renderTopBar = ({ user = {}, character = {} }) => {
  const name = character.name && character.name.toLowerCase();

  if (!name) {
    return (<div />);
  }

  return (
    <div className="top-bar">
      <Character
        character={character}
        className={name} />
      <span className="top-bar-name">{`${user.name} : ${character.name}`}</span>
    </div>
  );
};

Main.defaultProps = {
  user: {},
  character: {},
  goToLogin,
  renderTopBar,
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  goToLogin: PropTypes.func.isRequired,
  renderTopBar: PropTypes.func.isRequired,
};

const connectedMain = connect(state => ({
  user: state.user,
  character: state.character,
}), {})(Main);

export default withRouter(connectedMain);
