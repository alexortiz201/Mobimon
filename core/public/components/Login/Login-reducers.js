import { LOGIN } from './Login-actions';

const initialState = { user: {} };
const login = (state = initialState, action) => {
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
