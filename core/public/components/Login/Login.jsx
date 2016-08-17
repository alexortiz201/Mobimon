import React from 'react'; // eslint-disable-line no-unused-vars

const labeledInput = (setInput, className, label, inputValue, autoFocus = false) =>
  <label className={`form-input-label ${className}-form-input-label`}>
    <span className={`form-input-label-text ${className}-input-label-text`}>
      {label}
    </span>
    <input
      type="text"
      defaultValue={inputValue}
      ref={node => setInput(node)}
      className={`form-input-field ${className}-form-input-field`}
      autoFocus={autoFocus} />
  </label>;

const loginForm = ({
    className,
    label,
    buttonText = 'Button',
    autoFocus = false,
  },
  onSubmit,
  inputValue) => {
  let input;

  const setInput = (node) => {
    input = node;
  };

  return (
    <form
      className={`form ${className}-form`}
      onSubmit={ (e) => {
        onSubmit(e, input);
      }}>
      { labeledInput(setInput, className, label, inputValue, autoFocus) }
      <input
        className={`button ${className}-button`}
        type="submit"
        value={buttonText} />
    </form>
  );
};

const login = (props, onSubmit, newInputValue) => {
  const val = newInputValue || props.inputValue;

  return (
    <div className={`${props.className}-wrapper`}>
      <div className={`${props.className}`}>
        { loginForm(props, onSubmit, val) }
      </div>
    </div>
  );
};

export default login;
