import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import createLogout from './Logout.js';
import './Logout.less';

import { userLogout } from '../../redux/user/user-actions';
import { selectCharacter } from '../../redux/character/character-actions';

const Logout = createLogout(React);

const logout = (props, name) => {
  // if logged in log out
  if (name) {
    props.userLogout({});
    // clearing mobimon for now as well
    props.selectCharacter({});
  }

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

const connectedLogin = connect((state) => ({
  user: state.user,
  character: state.character,
}), {
  userLogout,
  selectCharacter,
})(Logout);

export default withRouter(connectedLogin);
