export const FireBaseUrl = 'https://mobimon.firebaseio.com/';
export const imagePaths = {
  ryu: 'M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z',
  ken: 'M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z',
  octobruise: '../../images/octobruise.svg',
  bilsner: '../../images/bilsner.svg',
};

export const POSSIBLE_MONSTER_STATES = [
  'Attacking',
  'Vulnerable to',
];

export const DIRECTIONS = [
  'high',
  'low',
];

export const POSSIBLE_PLAYER_ACTIONS = [
  'block',
  'attack',
];

export const COLORS = [
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
