import React from 'react'; // eslint-disable-line no-unused-vars

const labeledInput = (props, inputValue, setInput) => {
  const { className, label, autoFocus = false } = props;

  return (
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
    </label>
  );
};

const loginForm = (props, inputValue) => {
  const { className, buttonText = 'Button', onSubmit } = props;
  let input;

  const setInput = (node) => {
    input = node;
  };

  return (
    <form
      className={`form ${className}-form`}
      onSubmit={ (e) => {
        onSubmit(e, props, input);
      }}>
      { labeledInput(props, inputValue, setInput) }
      <input
        className={`button ${className}-button`}
        type="submit"
        value={buttonText} />
    </form>
  );
};

const login = (props, newInputValue) => {
  const val = newInputValue || props.inputValue;

  return (
    <div className={`${props.className}-wrapper`}>
      <div className={`${props.className}`}>
        { loginForm(props, val) }
      </div>
    </div>
  );
};

export default login;
