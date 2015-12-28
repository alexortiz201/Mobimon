import React, {
  PropTypes
}
from 'react';

// components
import Tabs from '../Tabs';
import ControlButtonContainer from './ControlButtonContainer';

// Styles
import './ControlsContainer.less';

export default class BattleScene extends React.Component {

  static propTypes = {
    tabNames: PropTypes.array,
    color: PropTypes.string,
    selectedTab: PropTypes.string.isRequired,
    onClickTab: PropTypes.func.isRequired,
    onClickActionButton: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={`controls-container ${this.props.color}`} >
        <Tabs
          tabNames={this.props.tabNames}
          color={this.props.color}
          selectedTab={this.props.selectedTab}
          onClickTab={this.props.onClickTab} />
        <div className="control-button-container-padding">
          <ControlButtonContainer onClickActionButton={this.props.onClickActionButton} />
        </div>
      </div>
    );
  }
}
