import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createPick from './Pick.js';
import './Pick.less';

import allChars from '../../../shared/characters.js';
import createCharacter from '../../components/Character/';

const Pick = createPick(React);
// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

// selectable mobimon
const characters = allChars.filter((char) => char.type === 'mobimon');

const renderCharacterList = (props) =>
  props.characters.map((char, index) =>
    <div
      key={`${char.name}-${index}`}
      className="character-container">
      <Character
        character={char}
        className={char.name.toLowerCase()} />
      <div className="character-name">{char.name}</div>
    </div>
  );

Pick.defaultProps = {
  user: {},
  renderCharacterList,
  characters,
};

Pick.PropTypes = {
  user: PropTypes.object.isRequired,
  renderCharacterList: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired,
};

const connectedPick = connect((state) => ({
  user: state.user,
}), {
})(Pick);

export default withRouter(connectedPick);
