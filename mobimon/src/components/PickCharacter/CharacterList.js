import React, {
  PropTypes
}
from 'react';

// components
import Character from './Character.js';

// Styles
import './CharacterList.less';

export default class CharacterList extends React.Component {
  static propTypes = {
    characters: PropTypes.array.isRequired,
    pickCharacter: PropTypes.func.isRequired,
    selected: PropTypes.object
  }

  _pickCharacter(character) {
    console.log(character);
    this.props.pickCharacter(character);
  }

  _renderCharacter(character, index) {
    let characterSelected = this.props.selected === character;

    return (
      <Character
        key={index}
        selectable={true}
        characterSelected={characterSelected}
        character={character}
        onClick={this._pickCharacter.bind(this, character)}
        size={character.size.pick}
        view={character.viewBox.full}
        shadow={true}
      />
    );
  }

  render() {
    return (
      <div className="character-list">
        {this.props.characters.map((character, index) => this._renderCharacter(character, index))}
      </div>
    );
  }
}