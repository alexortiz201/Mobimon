import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  let name = props.user && props.user.name;

  if (name) {
    // if mobimon is picked go to main
    // otherwise allowing picking of mobimon
    const route = props.user.mobimon ? '/' : '/pick';
    console.log('Would reroute to: ', route);
    // props.history.replaceState(null, '/pick');
  }

  const onSubmit = (e, inputNode) => {
    e.preventDefault();
    name = inputNode.value;

    if (!name) {
      return;
    }

    props.userLogin({
      name,
    });
  };

  return (
    template(props, onSubmit, name)
  );
};
