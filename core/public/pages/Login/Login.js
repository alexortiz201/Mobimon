import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const userName = props.user && props.user.name;

  return (
    template(props, userName)
  );
};
