import template from './Logout.jsx';

/* eslint-disable */
export default React => (props) => {
  const timeBeforeReroute = 1000;
  setTimeout(() => props.logout(props), timeBeforeReroute);

  return (
    template(props)
  );
};
/* eslint-enable */
