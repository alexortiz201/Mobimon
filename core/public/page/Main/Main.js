import React, { PropTypes } from 'react';
import 'normalize.css';
import './Main.less';
import * as template from './Main.jsx';

export default class Main extends React.Component {
  static propTypes = {
    currentUser: PropTypes.string,
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
        message: this.renderMessage('Howdy!'),
      })
    );
  }
}
