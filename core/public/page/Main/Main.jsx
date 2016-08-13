import React from 'react'; // eslint-disable-line no-unused-vars

const main = ({ children, message }) => (
  <div className="app-container">
    {children}
    {message}
  </div>
);

const renderMessage = (message) => (
  <h3 style={{ textAlign: 'center' }}>{ message }</h3>
);

export { main, renderMessage };
