import React, { PropTypes } from 'react';
import 'normalize.css';
import './Main.less';

export default class Main extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    currentUser: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    messages: [],
  };

  componentWillMount() {}

  renderMessage(message) {
    return (
      <h3 style={{ textAlign: 'center' }}>{message}</h3>
    );
  }

  render() {
    return (
      <div className="app-container">
        {this.props.children}
        {this.renderMessage('Howdy!')}
      </div>
    );
  }
}
