import React, {
  PropTypes
}
from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Characters } from '../../utils/constants';

// components
import Message from './Message';
import Character from '../PickCharacter/Character';

// Styles
import './MessageList.less';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.object.isRequired,
    storedCharacter: PropTypes.object
  }

  static defaultProps = {
    messages: {},
    storedCharacter: {}
  }

  _renderMessage(message, index) {
    let character = Characters.filter(character => {
      return character.name === message.character.name;
    })[0];

    return (
      <div
        className={`message-padding ${message.sender}`}
        key={index} >

        { character ?
          <Character
            selectable={false}
            characterSelected={false}
            character={character}
            size={character.size.message}
            view={character.viewBox.speaking}
            shadow={false} /> : null }

        <Message {...message} />
      </div>
    );
  }

  _renderMessages() {
    let messageRows = [],
      index = 0;

    for (let message in this.props.messages) {
      messageRows.push(
        this._renderMessage(this.props.messages[message], index));
      index++;
    }
    return messageRows;
  }

  render() {
    return (
      <div className="message-list-container">
        <ReactCSSTransitionGroup
          transitionName="message"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300} >
        {this._renderMessages()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
