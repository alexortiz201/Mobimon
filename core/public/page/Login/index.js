import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/user/user-actions';

import createLogin from './Login.js';
import './Login.less';

const Login = createLogin(React);

Login.defaultProps = {
  className: 'login',
  label: 'Username',
  buttonText: 'Log In',
  autoFocus: false,
  inputValue: 'Alex',
};

Login.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  user: PropTypes.object,
  userLogin: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default connect((state) => ({
  user: state.user,
}), {
  userLogin,
})(Login);
