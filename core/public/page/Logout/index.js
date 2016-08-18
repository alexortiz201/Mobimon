import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import createLogout from './Logout.js';
import './Logout.less';

import { userLogout } from '../../redux/user/user-actions';

const Logout = createLogout(React);

Logout.defaultProps = {
  className: 'logout',
  message: 'Good bye... Logging out...',
};

Logout.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default connect((state) => ({
  user: state.user,
}), {
  userLogout,
})(Logout);
