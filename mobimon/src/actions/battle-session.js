import {
  FireBaseUrl,
  POSSIBLE_MONSTER_STATES,
  POSSIBLE_PLAYER_ACTIONS,
  DIRECTIONS,
} from '../utils/constants';

import localForage from 'localforage';


// The Firebase refrences for each player's messageQueue
var messageQueueRefs = {};

// The Firebase refrences for the game events that the
// players send.
var  receivedActionsRef = '';

// Current rounds timeout. Use this value to clear the timeout
// in the event we receive all the messages before the time is up.
var ROUND_TIMEOUT = '';

var roundLimit = 3;

var roundResults = {
  win: 0,
  loss: 0
};

var GAME_OVER = false;

/**
 * Function that evaluates ending of game
 *
 */
function gameOver() {
  let msg = '';
  let monsterState = 'Dead'; //POSSIBLE_MONSTER_STATES[2]; // DEAD

  GAME_OVER = true;

  // Stop timer
  clearTimeout(ROUND_TIMEOUT);

  // Clear Firebase

  if (roundResults.win > roundResults.loss) {
    msg = 'You fuckin won!';
    monsterState = 'I will return!';
  } else {
    msg = 'You fuckin lost!';
    monsterState = 'I am Victorious!';
  }

  //alert(msg);

  // MessageEveryone
  monsterMessageAll(monsterState, msg);
}

function monsterMessageAll(msg, monsterState) {
  for (let ref in messageQueueRefs) {
    let message = {
      message: `${msg}, ${monsterState}`,
      sender: 'monster',
      properResponse: '',
      direction: '',
      target: '',
      character: {
        name: 'Octobruise'
      }
    };
    //ref.push(message);
    // dispatchedMessages.push(message);
  }
}

function getMessageQueueRef(currentBattleKey, currentUserName) {
  if (!messageQueueRefs[currentUserName]) {
    messageQueueRefs[currentUserName] = new Firebase(
      `${FireBaseUrl}/sessions/${currentBattleKey}/attendees/${currentUserName}`
    );
  }
  return messageQueueRefs[currentUserName];
}

function getReceivedActionsRef(currentBattleKey) {
  if (!receivedActionsRef) {
    receivedActionsRef = new Firebase(
      `${FireBaseUrl}/sessions/${currentBattleKey}/attendees/monster`
    );
  }
  return receivedActionsRef;
}

function getPlayersArray(players) {
  let playersArray = [];

  for (let player in players) {
    playersArray.push(player);
  }

  return playersArray;
}

function sendMonsterMessages(players, currentBattleKey) {
  let playersArray = getPlayersArray(players),
    dispatchedMessages = [];

  for (var i = 0; i < playersArray.length; i++) {
    let monsterState = POSSIBLE_MONSTER_STATES[Math.floor(Math.random() * 2)];
    let direction = DIRECTIONS[Math.floor(Math.random() * 2)];
    let player = playersArray[Math.floor(Math.random() * playersArray.length)];
    let message = {
      message: `Octobruise is ${monsterState} ${player} ${direction}`,
      sender: 'monster',
      properResponse: monsterState === POSSIBLE_MONSTER_STATES[0] ? POSSIBLE_PLAYER_ACTIONS[0] : POSSIBLE_PLAYER_ACTIONS[1],
      direction: direction,
      target: player,
      character: {
        name: 'Octobruise'
      }
    };
    getMessageQueueRef(
      currentBattleKey,
      playersArray[i],
    ).push(message);

    dispatchedMessages.push(message);
  }

  return dispatchedMessages;
}

function scoreRound(receivedMessages, dispatchedMessages) {
  let result = 'win';
  for (let i = 0; i < dispatchedMessages.length; i++) {
    let dMessage = dispatchedMessages[i],
      foundMatch = false;

    console.log(dMessage);

    for (let prop in receivedMessages) {
      let rMessage = receivedMessages[prop];
      console.log('in: ', rMessage);
      if (rMessage.action === dMessage.properResponse &&
          rMessage.direction === dMessage.direction &&
          rMessage.sender === dMessage.target) {
        foundMatch = true;
      }
    }
    if (!foundMatch) {
      return 'loss';
    }
  }

  return result;
}

export const DISPATCHED_MESSAGES = 'DISPATCHED_MESSAGES';

function setDispatchedMessages(messages) {
  return {
    type: DISPATCHED_MESSAGES,
    payload: {
      dispatchedMessages: messages
    }
  };
}

function endRound(dispatch, getState) {
  let state = getState(),
    result;
  let receivedMessages = state.battleSession.receivedMessages,
    dispatchedMessages = [...state.battleSession.dispatchedMessages];

    // clear after scoring
  dispatch(setDispatchedMessages({}));
  dispatch(setReceivedMessages({}));
  // compare the two arrays if they are equal monster is damaged
  // else, players take damage.
  result = scoreRound(receivedMessages, dispatchedMessages);
  roundResults[result]++;
  roundLimit--;

  if (roundLimit === 0) {
    gameOver();
  }

}

function startRound(dispatch, getState) {
  let state = getState();
  let players = state.battle.currentBattleSession.attendees,
    dispatchedMessages;

  if (GAME_OVER) {
    return;
  }

  // Send the messages out to each of the players
  dispatchedMessages = sendMonsterMessages(players, state.battle.currentBattleKey);
  dispatch(setDispatchedMessages(dispatchedMessages));
  ROUND_TIMEOUT = setTimeout(function() {
    endRound(dispatch, getState);
    startRound(dispatch, getState);
  }, 700000);
}

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';

export function requestingMessages() {
  return {
    type: REQUEST_MESSAGES,
    payload: {
      requestingMessages: true
    }
  };
}

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export function receiveMessages(messages) {
  return {
    type: RECEIVE_MESSAGES,
    payload: {
      messages
    }
  };
}

export const GET_MESSAGES = 'GET_MESSAGES';

export function getMessages() {
  return function(dispatch, getState) {
    let currentBattleKey = getState().battle.currentBattleKey;
    let currentUserName = getState().login.userName;

    if (!currentBattleKey || !currentUserName) {
      return;
    }

    // Dispatch that we are getting messages
    dispatch(requestingMessages());

    getMessageQueueRef(currentBattleKey, currentUserName).on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch(receiveMessages(snapshot.val()));
      }
    });
  };
}

export const PLAYER_TAB_SELECTED = 'PLAYER_TAB_SELECTED';

export function tabSelected(tabName) {
  return {
    type: PLAYER_TAB_SELECTED,
    payload: {
      selectedPlayerTab: tabName
    }
  };
}

export function playerActionButtonClicked(action, direction) {
  return function(dispatch, getState) {
    let state = getState(),
      currentUser = state.login.userName,
      currentBattleKey = state.battle.currentBattleKey,
      storedCharacter = state.battleSession.storedCharacter,
      target = currentUser;
    if (state.battleSession.selectedPlayerTab) {
      target = state.battleSession.selectedPlayerTab.toLowerCase();
    }
    // If the target is the current user, meaning user1 is clicking
    // an action on user1's tab, the intent is to respond directly
    // to the monster. So we can set the target to 'monster'.
    if (target === currentUser) {
      // Send info to monster's message queue.A
      target = 'monster';
    }
    getMessageQueueRef(currentBattleKey, target).push({
      message: `${target} ${action} ${direction}!`,
      action: action,
      direction: direction,
      sender: currentUser,
      character: storedCharacter
    });
  };
}

export const DECLARE_HOST = 'DECLARE_HOST';

export function declareHost(userName) {
  return {
    type: DECLARE_HOST,
    payload: {
      userName: userName
    }
  };
}

export const GAME_STARTING = 'GAME_STARTING';

export function gameStarting() {
  return {
    type: GAME_STARTING,
    payload: {}
  };
}

export const GAME_STARTED = 'GAME_STARTED';

export function gameStarted() {
  return {
    type: GAME_STARTED,
    payload: {}
  };
}

export const SET_RECEIVED_MESSAGES = 'STORE_RECEIVED_MESSAGES';

export function setReceivedMessages(receivedMessages) {
  return {
    type: SET_RECEIVED_MESSAGES,
    payload: {
      receivedMessages
    }
  };
}

// localStorage Character

export const LOADING_CHARACTER = 'LOADING_CHARACTER';

export function loadingCharacter() {
  return {
    type: LOADING_CHARACTER,
    payload: {
      loadingCharacter: true
    }
  };
}

export const LOADED_CHARACTER = 'LOADED_CHARACTER';

export function loadedCharacter(character) {
  return {
    type: LOADED_CHARACTER,
    payload: {
      storedCharacter: character
    }
  };
}

export function fetchStoredCharacter() {
  return function(dispatch) {
    dispatch(loadingCharacter);

    localForage
      .getItem('mobimon')
      .then((character) => {
        dispatch(loadedCharacter(character));
      });
  };
}

export function startGame() {
  return function(dispatch, getState) {
    let state = getState(),
      playersArray = getPlayersArray(state.battle.currentBattleSession.attendees);
    // Notify the app the game is starting
    dispatch(gameStarting());
    getReceivedActionsRef(state.battle.currentBattleKey).on('value', (receivedMessages) => {
      dispatch(setReceivedMessages(receivedMessages.val()));
      // Stop the 'round' if we receive all the messages.
      if (receivedMessages.val() && Object.keys(receivedMessages.val()).length >= playersArray.length) {
        // Clear out the timeout if present.
        clearTimeout(ROUND_TIMEOUT);
        endRound(dispatch, getState);
        startRound(dispatch, getState);
      }
    });
    // start up the setTimeout shit
    startRound(dispatch, getState);
    dispatch(gameStarted());
  };
}
