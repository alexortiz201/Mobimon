import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import 'normalize.css';
import './Main.less';
import createMain from './Main.js';

const Main = createMain(React);

const goToLogin = (props) => props.router.replace('/login');

Main.defaultProps = {
  user: {},
  character: {},
  goToLogin,
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  goToLogin: PropTypes.func.isRequired,
};

const connectedMain = connect((state) => ({
  user: state.user,
  character: state.character,
}), {})(Main);

export default withRouter(connectedMain);
