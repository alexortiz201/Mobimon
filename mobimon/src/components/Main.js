require('normalize.css');
require('styles/App.css');

import React, { PropTypes }from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';

@connect((state) => ({
  currentUser: state.login.userName,
  currentBattleKey: state.battle.currentBattleKey
}), {})
export default class AppComponent extends React.Component {

  static propTypes = {
    messages: PropTypes.array,
    currentUser: PropTypes.string,
    currentBattleKey: PropTypes.string,
    children: PropTypes.node,
    history: PropTypes.object.isRequired
  }
  static defaultProps = {
    messages: []
  }

  componentWillMount() {
    if (!this.props.currentUser) {
      this.props.history.replaceState(null, '/login');
    } else if (!this.props.currentBattleKey) {
      this.props.history.replaceState(null, '/join');
    }
  }

  _renderMessage(message) {
    return (
      <h3>{message.text}</h3>
    );
  }

  render() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    );
  }
}
