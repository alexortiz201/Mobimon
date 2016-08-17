import React from 'react'; // eslint-disable-line no-unused-vars

const labeledInput = (setInput, className, label, autoFocus = false) =>
  <label className={`form-input-label ${className}-form-input-label`}>
    <span className={`form-input-label-text ${className}-input-label-text`}>
      {label}
    </span>
    <input
      type="text"
      ref={node => setInput(node)}
      className={`form-input-field ${className}-form-input-field`}
      autoFocus={autoFocus} />
  </label>;

const loginForm = ({ className, label, buttonText = 'Button', autoFocus = false }, onSubmit) => {
  let input;

  const setInput = (node) => {
    input = node;
  };

  return (
    <form
      className={`form ${className}-form`}
      onSubmit={ (e) => {
        onSubmit(e, input);
        input.value = '';
      }}>
      { labeledInput(setInput, className, label, autoFocus) }
      <input
        className={`button ${className}-button`}
        type="submit"
        value={buttonText} />
    </form>
  );
};

const login = (props, onSubmit) =>
  <div
    className={`${props.className}`}>
    { loginForm(props, onSubmit) }
  </div>;

export default login;
