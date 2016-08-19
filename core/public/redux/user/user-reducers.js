import { LOGIN_USER, LOGOUT_USER } from './user-actions';

const initialState = {
  loggedIn: false,
  name: '',
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        loggedIn: true,
        ...action.user,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
