import React from 'react'; // eslint-disable-line no-unused-vars

const labeledInput = ({ autoFocus, label }) => (
  <label className="login-form-input-label">
    {label}
    <input
      type="text"
      className="login-form-input-field"
      autoFocus={autoFocus}
      ref="inputField" />
  </label>
);

const form = ({ onSubmit }) => (
  <form
    className="login-form"
    onSubmit={ (e) => onSubmit(e) }>
    { labeledInput(true, 'Username') }
    <input className="button" type="submit" value="Log In" />
  </form>
);

export { form, labeledInput };
