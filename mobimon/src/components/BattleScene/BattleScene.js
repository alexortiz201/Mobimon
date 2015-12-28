import React, {PropTypes} from 'react';
// import { Router } from 'react-router';
import { connect } from 'react-redux';

// actions
import {
  tabSelected,
  getMessages,
  playerActionButtonClicked,
  declareHost,
  fetchStoredCharacter,
  startGame,
} from '../../actions/battle-session';

// components
import MessageList from './MessageList';
import ControlsContainer from './ControlsContainer';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

// Styles
import './BattleScene.less';

@connect((state) => ({
  messages: state.battleSession.messages,
  selectedTab: state.battleSession.selectedPlayerTab,
  players: state.battle.currentBattleSession.attendees,
  storedCharacter: state.battleSession.storedCharacter,
  gameStarted: state.battleSession.gameStarted,
  gameStarting: state.battleSession.gameStarting,
  userName: state.login.userName,
  host: state.battleSession.host,
}), {
  getMessages,
  tabSelected,
  playerActionButtonClicked,
  fetchStoredCharacter,
  declareHost,
  startGame,
})
export default class BattleScene extends React.Component {
  static propTypes = {
    players: PropTypes.object,
    messages: PropTypes.object,
    selectedTab: PropTypes.string,
    getMessages: PropTypes.func.isRequired,
    tabSelected: PropTypes.func.isRequired,
    fetchStoredCharacter: PropTypes.func.isRequired,
    storedCharacter: PropTypes.object
  }

  static defaultProps = {
    players: {}
  }

  componentWillMount() {
    // Check to see if we are the host.
    // We are the host if we are the first one in the game.
    if (Object.keys(this.props.players).length === 1) {
      this.props.declareHost(this.props.userName);
    }
    this.props.getMessages();
    this.props.fetchStoredCharacter();
  }

  _getTabNames() {
    let tabNames = [],
      players = this.props.players;

    for (let player in players) {
      tabNames.push(player.toUpperCase());
    }
    return tabNames;
  }

  _getDefaultSelectedTab() {
    for (let player in this.props.players) {
      if(this.props.userName === player) {
        return player.toUpperCase();
      }
    }
    return '';
  }

  _onClickTab(name) {
    this.props.tabSelected(name);
  }

  _onClickPlayerAction(action, direction) {
    this.props.playerActionButtonClicked(action, direction);
  }

  render() {
    let tabNames = this._getTabNames(),
      playerColor = this.props.players[this.props.userName].color;

    let content = (
      <MessageList
        messages={this.props.messages}
        storedCharacter={this.props.storedCharacter} />
    );

    if (this.props.gameStarting) {
      content = (
        <div className="content-container">
          <Loader />
        </div>
      );
    } else if (this.props.host && !this.props.gameStarted) {
      content = (
        <div className="content-container">
          <Button
            text={'start'}
            onClick={this.props.startGame} />
        </div>
      );
    }

    return (
      <div className="battle-scene-container">
        {content}
        <ControlsContainer
          tabNames={tabNames}
          selectedTab={this.props.selectedTab || this._getDefaultSelectedTab()}
          color={playerColor}
          onClickTab={this._onClickTab.bind(this)}
          onClickActionButton={this._onClickPlayerAction.bind(this)} />
      </div>
    );
  }
}
