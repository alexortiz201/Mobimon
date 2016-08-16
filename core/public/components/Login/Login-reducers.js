import { LOGIN } from './Login-actions';

const login = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default login;
