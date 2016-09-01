import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createLogin from './Login.js';
import './Login.less';

import { userLogin } from '../../redux/user/user-actions';

const Login = createLogin(React);

const onSubmit = (e, props, inputNode) => {
  e.preventDefault();
  if (inputNode.value) {
    props.userLogin({
      name: inputNode.value,
    });

    props.router.replace('/pick');
  }
};

Login.defaultProps = {
  className: 'login',
  label: 'Username',
  buttonText: 'Log In',
  autoFocus: false,
  inputValue: '',
  onSubmit,
};

Login.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  user: PropTypes.object,
  userLogin: PropTypes.func,
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const connectedLogin = connect((state) => ({
  user: state.user,
}), {
  userLogin,
})(Login);

export default withRouter(connectedLogin);
