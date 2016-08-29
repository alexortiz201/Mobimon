// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ character = {}, className }) => {
  const charName = character.name ? character.name.toLowerCase() : '';

  return (
    <div className={`character character-${charName} ${className}`}>
      <div className={`character-inner character-inner-${charName}`}></div>
    </div>
  );
};
