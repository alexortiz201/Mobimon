import utils from '../../utils/redux/redux-utils';

const LOGIN = 'LOGIN';

const userLogin = utils.makeActionCreator(LOGIN, 'user');

export { LOGIN, userLogin };
