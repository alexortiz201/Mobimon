import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userLogin } from './Login-actions';
import * as template from './Login.jsx';

// Styles
import './Login.less';

class Login extends React.Component {
  componentDidMount() {}

  handleSubmit(e) {
    debugger // eslint-disable-line
    e.preventDefault();

    const userName = this.refs.inputField.value;
    if (!userName) {
      return;
    }

    this.props.userLogin({
      name: userName,
    });
    // this.props.history.replaceState(null, '/pick');

    return;
  }

  render() {
    return (
      template.form({
        onSubmit: (e) => this.handleSubmit(e),
      })
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  userLogin: PropTypes.func,
};

export default connect((state) => ({
  user: state.login.user,
}), {
  userLogin,
})(Login);
