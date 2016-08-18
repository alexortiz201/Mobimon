import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const timeBeforeReroute = 1000;
  const newName = props.user && props.user.name;

  if (newName) {
    setTimeout(() => props.goToRoute(props), timeBeforeReroute);
  }

  return (
    template(props, newName)
  );
};
