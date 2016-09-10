import React from 'react'; // eslint-disable-line no-unused-vars

const logout = (props) =>
  <div className={`${props.className}-wrapper`}>
    <div className={`${props.className}`}>
      { props.message ?
        <h4>{props.message}</h4> :
        'Rerouting to Login...'
      }
    </div>
  </div>;

export default logout;
