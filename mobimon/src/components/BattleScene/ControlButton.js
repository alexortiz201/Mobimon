import React, {PropTypes} from 'react';

import { Items } from '../../utils/constants';

import './ControlButton.less';

// components
import Svg from '../Utils/Svg';

export default class ControlButton extends React.Component {

  static propTypes = {
    action: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    onClickActionButton: PropTypes.func
  }

  _getItem(action) {
    let item = Items.filter(item => {
      return action === item.type;
    })[0];

    return item;
  }

  render() {
    let text = this.props.direction === 'high' ? 'high' : 'low';
    let item = this._getItem(this.props.action);
    return (
      <div
        className="control-button"
        onClick={this.props.onClickActionButton.bind(null, this.props.action, this.props.direction)} >
        <div>
          <Svg type={'item'} icon={item.name} size={item.size.controls} view={item.viewBox.full} />
        </div>
        <div>
          {text}
        </div>
      </div>
    );
  }
}
