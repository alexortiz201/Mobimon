const FireBaseUrl = 'https://mobimon.firebaseio.com/';
const imagePaths = {
  ryu: 'M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z',
  ken: 'M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z',
  octobruise: '../../images/octobruise.svg',
  bilsner: '../../images/bilsner.svg'
};

const POSSIBLE_MONSTER_STATES = [
  'Attacking',
  'Vulnerable to'
];

const DIRECTIONS = [
  'high',
  'low'
];

const POSSIBLE_PLAYER_ACTIONS = [
  'block',
  'attack'
];

const COLORS = [
  'purple',
  'pink',
  'blue',
  'lightblue',
];

export default {
  FireBaseUrl,
  imagePaths,
  POSSIBLE_MONSTER_STATES,
  DIRECTIONS,
  POSSIBLE_PLAYER_ACTIONS,
  COLORS,
};
