import utils from '../../utils/redux/redux-utils';

const LOGIN_USER = 'LOGIN_USER';
const userLogin = utils.makeActionCreator(LOGIN_USER, 'user');

const LOGOUT_USER = 'LOGOUT_USER';
const userLogout = utils.makeActionCreator(LOGOUT_USER, 'user');

export { LOGIN_USER, LOGOUT_USER, userLogin, userLogout };
