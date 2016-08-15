import React, { PropTypes } from 'react';
import 'normalize.css';
import './Main.less';
import * as template from './Main.jsx';

class Main extends React.Component {
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
      template.renderMessage(message)
    );
  }

  render() {
    return (
      template.main({
        children: this.props.children,
        message: this.renderMessage('Mobimon Coming Soon!'),
      })
    );
  }
}

export default Main;
