import template from './Pick.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const timeBeforeReroute = 1000;
  const userName = props.user && props.user.name;
  const charName = props.character && props.character.name;

  if (!userName) {
    setTimeout(() => props.goToRoute(props, '/login'), timeBeforeReroute);
  } else if (userName && charName) {
    setTimeout(() => props.goToRoute(props, '/'), timeBeforeReroute);
  }

  return (
    template(props)
  );
};
