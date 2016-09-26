// eslint-disable-next-line no-unused-vars
const createButtonTemplate = React => ({
  className = '',
  text = 'Submit',
  onClick = () => {},
}) =>
  <button
    className={`button ${className}`}
    onClick={e => onClick(e)}>
    {text}
  </button>;

export default createButtonTemplate;
