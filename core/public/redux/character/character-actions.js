import utils from '../../utils/redux/redux-utils';

const SELECT_CHARACTER = 'SELECT_CHARACTER';
const selectCharacter = utils.makeActionCreator(SELECT_CHARACTER, 'character');

export { SELECT_CHARACTER, selectCharacter };
