import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';

// actions

// Styles
import './LabeledInput.less';

export default class LabeledInput extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    autoFocus: PropTypes.string
  }

  render() {
    return (
      <label className="labelWithInput">{this.props.label}
        <input className="inputField" type="text"
          autoFocus="{this.props.autoFocus}" ref="inputField" />
      </label>
    );
  }
}
