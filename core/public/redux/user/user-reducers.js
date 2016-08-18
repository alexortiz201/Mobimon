import { LOGIN, LOGOUT } from './user-actions';

const initialState = {
  loggedIn: false,
  name: '',
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        ...action.user,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
