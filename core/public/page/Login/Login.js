import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const timeBeforeReroute = 1000;
  const userName = props.user && props.user.name;
  const charName = props.character && props.character.name;

  if (userName && charName) {
    setTimeout(() => props.goToRoute(props, '/'), timeBeforeReroute);
  } else if (userName) {
    setTimeout(() => props.goToRoute(props, '/pick'), timeBeforeReroute);
  }

  return (
    template(props, userName)
  );
};
