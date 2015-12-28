import React, {
  PropTypes
}
from 'react';

// components
import Svg from '../Utils/Svg';

// styles
import './Character.less';

export default class Character extends React.Component {
  static propTypes = {
    character: PropTypes.object.isRequired,
    characterSelected: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    view: PropTypes.string,
    shadow: PropTypes.bool
  }

  _selected() {
    let klass = this.props.character.type === 'mobimon' ? 'character' : 'npc';

    return this.props.characterSelected ? klass + ' selected' : klass;
  }

  render() {
    return (
      <div className={this._selected()}>
        <div onClick={this.props.onClick}>
          <div>
            <Svg type={'character'} icon={this.props.character.name} size={this.props.size} view={this.props.view} />
          </div>
        </div>
        { this.props.shadow ? <div className="shadow"></div> : null }
      </div>
    );
  }
}

