import React, { PropTypes } from 'react';
import './Pick.less';
import createPick from './Pick.js';

const Pick = createPick(React);

Pick.defaultProps = {
  user: { name: '' },
};

Pick.PropTypes = {
  user: PropTypes.object.isRequired,
};

export default Pick;
