import React from 'react';

//components
import ControlButton from './ControlButton';

import './ControlButtonContainer.less';

export default class ControlButtonContainer extends React.Component {

  render() {
    return (
      <div className="control-button-container" >
        <ControlButton
          action="attack"
          direction="high"
          onClickActionButton={this.props.onClickActionButton}/>
        <ControlButton
          action="block"
          direction="high"
          onClickActionButton={this.props.onClickActionButton} />
        <ControlButton
          action="attack"
          direction="low"
          onClickActionButton={this.props.onClickActionButton} />
        <ControlButton
          action="block"
          direction="low"
          onClickActionButton={this.props.onClickActionButton} />
      </div>
    );
  }
}
