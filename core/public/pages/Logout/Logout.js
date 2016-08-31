import template from './Logout.jsx';

/* eslint-disable */
export default React => (props) => {
  const timeBeforeReroute = 1000;
  const name = props.user && props.user.name;

  setTimeout(() => props.logout(props, name), timeBeforeReroute);

  return (
    template(props, name)
  );
};
/* eslint-enable */
