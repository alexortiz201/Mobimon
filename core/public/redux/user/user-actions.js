import utils from '../../utils/redux/redux-utils';

const LOGIN = 'LOGIN';
const userLogin = utils.makeActionCreator(LOGIN, 'user');

const LOGOUT = 'LOGOUT';
const userLogout = utils.makeActionCreator(LOGOUT, 'user');

export { LOGIN, LOGOUT, userLogin, userLogout };
