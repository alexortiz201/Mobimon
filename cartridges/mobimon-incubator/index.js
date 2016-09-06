import React, { PropTypes } from 'react';
// eslint-disable-next-line no-unused-vars
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createIncubator from './Incubator.js';
import './Incubator.less';

import createCharacter from '../../core/public/components/Character/';

const reducers = [];
const path = '/incubator';
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

export const connectedIncubator = withRouter(connect((state) => ({
  character: state.character,
}), {})(Incubator));

export const Route = () =>
  <Route key={path} path={path} component={connectedIncubator} />;

export default { Route, reducers };
