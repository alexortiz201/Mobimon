import template from './Logout.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  // if logged in log out
  if (props.user && props.user.name) {
    props.userLogout();
    props.history.replaceState(null, '/login');
  }

  return (
    template(props)
  );
};
