// eslint-disable-next-line no-unused-vars
import React from 'react';

const pick = (props) => {
  const playerName = (props.user && props.user.name) ? props.user.name : '';
  return (
    <div className="pick-character-container">
      <h3>
        Welcome <span className="user-name">{playerName}</span>, pick your destiny...
      </h3>
    </div>
  );
};

export default pick;
