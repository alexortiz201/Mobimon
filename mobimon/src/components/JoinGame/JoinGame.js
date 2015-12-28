import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// actions
import { fetchBattles, joinBattle, addBattle } from '../../actions/battle';

// Components
import LabeledInput from '../LabeledInput/LabeledInput.js';

// Styles
import './JoinGame.less';

@connect((state) => ({
  battles: state.battle.battles,
  requestingBattles: state.battle.requestingBattles,
  currentBattleKey: state.battle.currentBattleKey,
  joinedGame: state.battle.joined,
}), {
  fetchBattles,
  joinBattle,
  addBattle
})
export default class JoinGame extends React.Component {
  static propTypes = {
    battles: PropTypes.object,
    fetchBattles: PropTypes.func.isRequired,
    joinBattle: PropTypes.func.isRequired,
    addBattle: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.fetchBattles();
  }

  // Check to see if we are joined, if so route
  componentWillReceiveProps(nextProps) {
    if (nextProps.joinedGame) {
      this.props.history.replaceState(null, `/battle/${nextProps.currentBattleKey}`);
    }
  }

  _renderBattleRow(battleKey) {

    return (
      <div
        key={battleKey}
        className="collection-item"
        onClick={this._joinBattle.bind(this, battleKey)}>
        {this.props.battles[battleKey].name}
      </div>
    );
  }

  _joinBattle(battleKey) {
    this.props.joinBattle(battleKey);
  }

  _getBattleList() {
    let battleList = [];
    for (let battle in this.props.battles) {
      battleList.push(this._renderBattleRow(battle));
    }
    return battleList;
  }

  handleInputJoinGame(event) {
    event.preventDefault();
    var battleName = this.refs.battleNameInput.refs.inputField.value;
    var battleKey = battleName.toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!battleKey) {
      return;
    }
    this.props.addBattle({
      battleKey: battleKey,
      battleName: battleName
    });
  }

  render() {
    return (
      <div className="container">
        <form className="formJoinBattle" onSubmit={this.handleInputJoinGame.bind(this)}>
          <LabeledInput label="Enter a New Battle" ref="battleNameInput"/>
          <input className="button" type="submit" value="Join" />
        </form>
        <div className="header-container">
          <h3>Or Select a Battle to Join </h3>
        </div>
        <div className="collection">
          {this._getBattleList()}
        </div>
      </div>
    );
  }
}
