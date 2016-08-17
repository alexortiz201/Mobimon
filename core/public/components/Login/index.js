import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import createLogin from './Login.js';
import { userLogin } from './Login-actions';

// Styles
import './Login.less';

const Login = createLogin(React);

Login.propTypes = {
  user: PropTypes.object.isRequired,
  userLogin: PropTypes.func,
};

export default connect((state) => ({
  user: state.login.user,
}), {
  userLogin,
})(Login);
