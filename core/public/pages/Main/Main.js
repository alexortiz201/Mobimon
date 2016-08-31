import template from './Main.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const timeBeforeReroute = 1000;
  const userName = props.user && props.user.name;
  const charName = props.character && props.character.name;

  if (!userName || !charName) {
    setTimeout(() => props.goToLogin(props), timeBeforeReroute);
  }

  return (
    template(props)
  );
};
