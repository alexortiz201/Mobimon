// eslint-disable-next-line no-unused-vars
import React from 'react';

const main = ({ user = {}, character = {} }) =>
  <div className="app-container">
    <div className="top-bar">
      {`${user.name} : ${character.name}`}
    </div>
  </div>;

export default main;
