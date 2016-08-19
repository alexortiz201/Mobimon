// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ className }) =>
  <div className={`character character-${className}`}>
    <div className={`character-inner character-inner-${className}`}></div>
  </div>;
