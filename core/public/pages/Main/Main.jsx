// eslint-disable-next-line no-unused-vars
import React from 'react';

const main = props =>
  <div className="app-container">
    {props.renderTopBar(props)}
    {props.children}
  </div>;

export default main;
