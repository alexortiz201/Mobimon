import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';

// actions

// Styles
import './Button.less';

export default class Button extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div
        className="button"
        onClick={this.props.onClick} >
        {this.props.text}
      </div>
    );
  }
}
