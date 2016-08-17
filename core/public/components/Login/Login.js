import template from './Login.jsx';

// eslint-disable-next-line no-unused-vars
export default React => (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    // const userName = props.refs.inputField.value;

    // if (!userName) {
    //   return;
    // }

    // props.userLogin({
    //   name: userName,
    // });
    // this.props.history.replaceState(null, '/pick');
  };

  // template(props)
  return (
    template({
      onSubmit,
    })
  );
};
