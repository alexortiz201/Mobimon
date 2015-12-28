export const FireBaseUrl = 'https://mobimon.firebaseio.com/';

export const Characters = [
  {
    name: 'Bilsner',
    type: 'mobimon',
    viewBox: {
      full: '0 0 116 133',
      speaking: '10 0 100 70'
    },
    url: '../../images/characters/bilsner.svg',
    size: {
      pick: '100',
      message: '60'
    }
  }, {
    name: 'Bird',
    type: 'mobimon',
    viewBox: {
      full: '0 0 68 148',
      speaking: '-15 0 100 120'
    },
    url: '../../images/characters/bird.svg',
    size: {
      pick: '100',
      message: '60'
    }
  }, {
    name: 'Peater',
    type: 'mobimon',
    viewBox: {
      full: '0 0 121 145',
      speaking: '30 0 60 90'
    },
    url: '../../images/characters/peater.svg',
    size: {
      pick: '100',
      message: '60'
    }
  }, {
    name: 'Octobruise',
    type: 'npc',
    viewBox: {
      full: '0 0 309 212',
      speaking: '100 0 109 142'
    },
    url: '../../images/characters/octobruise.svg',
    size: {
      pick: '100',
      message: '60',
      background: '60%'
    }
  }
];

export const Items = [
  {
      name: 'sword',
      type: 'attack',
      viewBox: {
        full: '0 0 42 42'
      },
      size: {
        controls: '30'
      },
      url: '../../images/items/sword.svg'
    },
    {
      name: 'shield',
      type: 'block',
      viewBox: {
        full: '0 0 43 55'
      },
      size: {
        controls: '30'
      },
      url: '../../images/items/shield.svg'
  }
];

export const imagePaths = {
  ryu: 'M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z',
  ken: 'M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z',
  octobruise: '../../images/octobruise.svg',
  bilsner: '../../images/bilsner.svg'
};

export const POSSIBLE_MONSTER_STATES = [
  'Attacking',
  'Vulnerable to'
];

export const DIRECTIONS = [
  'high',
  'low'
];

export const POSSIBLE_PLAYER_ACTIONS = [
  'block',
  'attack'
];


export const COLORS = [
  'purple',
  'pink',
  'blue',
  'lightblue',
];
