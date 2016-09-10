import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createLogout from './Logout.js';
import './Logout.less';

import { userLogout } from '../../redux/user/user-actions';
import { clearState } from '../../utils/storage/storage';

const Logout = createLogout(React);
const logout = (props) => {
  clearState();
  props.userLogout();
  props.router.replace('/login');
};

Logout.defaultProps = {
  className: 'logout',
  message: 'Good bye... Logging out...',
  logout,
};

Logout.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const connectedLogin = connect(() => ({
}), {
  userLogout,
})(Logout);

export default withRouter(connectedLogin);
