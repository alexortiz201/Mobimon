import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createIncubator from './Incubator.js';
import './Incubator.less';

import createCharacter from '../../core/public/components/Character/';

const path = '/incubator';
// const deps = [React];


const Incubator = createIncubator(React);
// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

const render = ({ character = {} }) => {
  const name = character.name && character.name.toLowerCase();

  if (!name) {
    return (<div />);
  }

  return (
    <div className="incubator day-time">
      <Character
        character={character}
        className={name} />
    </div>
  );
};

Incubator.defaultProps = {
  character: {},
  render,
};

Incubator.propTypes = {
  character: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

const connectedIncubator = withRouter(connect((state) => ({
  character: state.character,
}), {})(Incubator));

const Route = {
  path,
  component: connectedIncubator,
};

export default Route;
