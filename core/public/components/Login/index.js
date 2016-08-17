import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import createLogin from './Login.js';
import { userLogin } from './Login-actions';

// Styles
import './Login.less';

const Login = createLogin(React);

Login.defaultProps = {
  className: 'login',
  label: 'Username',
  buttonText: 'Log In',
  autoFocus: false,
};

Login.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  userLogin: PropTypes.func,
};

export default connect(() => ({
}), {
  userLogin,
})(Login);
