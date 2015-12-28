import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import localForage from 'localforage';

// actions
import { fetchCharacters, pickCharacter } from '../../actions/pick-character';

// styles
import './PickCharacter.less';

// components
import CharacterList from './CharacterList.js';
import Character from './Character.js';

@connect((state) => ({
  characters: state.pickCharacter.characters,
  selectedCharacter: state.pickCharacter.selectedCharacter
}), {
  fetchCharacters,
  pickCharacter
})
export default class PickCharacter extends React.Component {
  static propTypes = {
    characters: PropTypes.array.isRequired,
    selectedCharacter: PropTypes.object,
    fetchCharacters: PropTypes.func.isRequired,
    pickCharacter: PropTypes.func.isRequired
  }

  componentWillMount() {
  	// redux via connect fn triggers dispatch(this.props.fetchCharacters());
    this.props.fetchCharacters();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedCharacter) {
      localForage
        .setItem('mobimon', newProps.selectedCharacter)
        .then((value) => {
          this.props.history.replaceState(null, '/join');
        });

      return;
    }
  }

  render() {
    // Pulling Octo for intro picking decor
    let octo;

    this.props.characters.forEach(char => {
      if (char.name === 'Octobruise') {
        octo = char;
      }
    });

    return (
    	<div className="container pick-character">
        <div className="header-container">
          <h3> Select a character </h3>
        </div>
        <CharacterList
        	characters={ this.props.characters.filter(char => { return char.type !== 'npc'; }) }
        	pickCharacter={this.props.pickCharacter}
        	selected={this.props.selectedCharacter} />

        { octo ?
          <Character
            selectable={false}
            characterSelected={false}
            character={octo}
            size={octo.size.background}
            view={octo.viewBox.speaking}
            shadow={false} /> : null
        }
      </div>
    );
  }
}

