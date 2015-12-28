import {LOGIN} from '../actions/login';

const initialstate = {
  userName: ''
};
export default function login(state = initialstate, action) {

  switch(action.type) {
  case LOGIN:
    return {...state,
      userName: action.payload
    };
  default:
    return state;
  }
}
