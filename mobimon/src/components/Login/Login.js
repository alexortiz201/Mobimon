import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/login';
import LabeledInput from '../LabeledInput/LabeledInput.js';

// Styles
import './Login.less';

@connect((state) => ({
  user: state.login.userName
}), {
  userLogin
})
export default class Login extends React.Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    userLogin: PropTypes.func,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: ''
  };

  handleSubmit(e) {
    e.preventDefault();
    var userName = this.refs.userNameInput.refs.inputField.value;

    if (!userName) {
      return;
    }

    this.props.userLogin(userName);
    this.props.history.replaceState(null, '/pick');

    return;
  }

  render() {
    return (
      <form className="login"
        onSubmit={this.handleSubmit.bind(this)}>
        <LabeledInput label="Username"  autoFocus="true"
          ref="userNameInput" />
        <input className="button" type="submit" value="Log In" />
      </form>
    );
  }
}
