import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const newName = props.user && props.user.name;
  props.goToRoute(props);

  return (
    template(props, newName)
  );
};
