import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  let name = props.user && props.user.name;
  const onSubmit = (e, inputNode) => {
    e.preventDefault();
    name = inputNode.value;

    if (!name) {
      return;
    }

    props.userLogin({
      name,
    });
    // this.props.history.replaceState(null, '/pick');
  };

  return (
    template(props, onSubmit, name)
  );
};
