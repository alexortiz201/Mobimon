import React from 'react';
// import { connect } from 'react-redux';

// actions

// Styles
import './Loader.less';

export default class Loader extends React.Component {

  render() {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }
}
