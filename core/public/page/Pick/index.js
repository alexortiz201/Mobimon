import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createPick from './Pick.js';
import './Pick.less';

import allChars from '../../../shared/characters.js';
import createCharacter from '../../components/Character/';

import { selectCharacter } from '../../redux/character/character-actions';

const Pick = createPick(React);
// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

// selectable mobimon
const characters = allChars.filter((char) => char.type === 'mobimon');

const renderCharacterList = (props) =>
  props.characters.map((char, index) =>
    <div
      key={`${char.name}-${index}`}
      onClick={() => props.onSelectCharacter(props, char)}
      className="character-container">
      <Character
        character={char}
        className={char.name.toLowerCase()} />
      <div className="character-name">{char.name}</div>
    </div>
  );

const onSelectCharacter = (props, character) => {
  // dispatch Char selected
  props.selectCharacter(character);
};

Pick.defaultProps = {
  user: {},
  character: {},
  renderCharacterList,
  characters,
  onSelectCharacter,
};

Pick.PropTypes = {
  user: PropTypes.object.isRequired,
  renderCharacterList: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired,
  onSelectCharacter: PropTypes.func.isRequired,
};

const connectedPick = connect((state) => ({
  user: state.user,
  character: state.character,
}), {
  selectCharacter,
})(Pick);

export default withRouter(connectedPick);
