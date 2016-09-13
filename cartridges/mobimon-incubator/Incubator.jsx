// eslint-disable-next-line no-unused-vars
import React from 'react';

const incubator = props =>
  <div className="incubator-container">
    {props.render(props)}
  </div>;

export default incubator;
