import React, {PropTypes} from 'react';
// import { connect } from 'react-redux';

// actions

// Styles
import './Message.less';

// @connect((state) => ({}), {})
export default class Message extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: '',
    message: 'Default message bitch!'
  }

  render() {
    let type = this.props.sender === 'monster' ? 'monster' : 'friendly',
      className = `message-container ${type}`;
    return (
      <div className="message-bubble" >
        <div className={className}>
          <h3>{this.props.message}</h3>
          <div className={`speech-tail ${type}`}></div>
        </div>
      </div>
    );
  }
}
