import React from 'react'; // eslint-disable-line no-unused-vars

const logout = (props) => {
  return (
    <div className={`${props.className}-wrapper`}>
      <div className={`${props.className}`}>
        <h4>{props.message}</h4>
      </div>
    </div>
  );
};

export default logout;
