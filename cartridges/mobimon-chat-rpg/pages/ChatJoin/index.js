// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import './ChatJoin.less';

import { load, init } from '../../services/firebase/firebase.service';
import createLogin from '../../../../core/public/pages/Login/Login.js';
import { selectRoom, leaveRoom, getRooms, getPlayers } from '../../redux/session/session-actions';

import { COLORS } from '../../../../core/shared/other';

// eslint-disable-next-line no-unused-vars
const Login = createLogin(React);

// 300000 = 5 min ,  120000 = 2 min, 60000 = 1 min
const EXPIRE_TIMESTAMP = 120000;
let roomTimeStamp = 0;

/**
 * Timestap for busting cached rooms every 2 min
 * @param  {int} expMin  expire amount milli
 * @return {bool}
 */
const timeStampExpBool = (expMin = EXPIRE_TIMESTAMP) => {
  const currTimeStamp = new Date(Date.now()).getTime();
  return expMin <= (currTimeStamp - roomTimeStamp);
};

const handleSelection = (props, room) => {
  const name = room.name.toLowerCase().replace(/[^a-z0-9_]/g, '');
  const update = {
    players: {
      ...props.players,
      [props.userName]: {
        color: COLORS[Math.floor(Math.random() * 4)],
      },
    },
  };

  const newRoom = {
    ...room,
    name,
  };

  props.selectRoom({
    ...newRoom,
  }, {
    ...newRoom,
    ...update,
  });

  props.router.replace(`/chat-rpg/battle/${room.key}`);
};

const onSubmit = (e, props, inputNode) => {
  e.preventDefault();
  const val = inputNode.value;
  handleSelection(props, { key: uuid.v4(), name: val });
};

const setUpFireBaseScripts = () => load().then(init);
setUpFireBaseScripts();

const renderRoomListItem = (props, { key, name }) =>
  <button
    key={`${name}-${key}`}
    className={`button ${name}`}
    onClick={() => handleSelection(props, { key, name })}>
    {name}
  </button>;

const refreshRoomList = (props) => {
  setUpFireBaseScripts()
    .then(() => {
      props.getRooms();
      roomTimeStamp = new Date(Date.now()).getTime();
    });
};

const renderRoomListContainer = (props) => {
  if (timeStampExpBool()) {
    refreshRoomList(props);
  }

  if (!Object.keys(props.rooms).length) {
    return null;
  }

  return (
    <div className="game-list-container">
      <h3 className="game-list-header">Or Select a Battle to Join</h3>
      { Object.keys(props.rooms).map((key) => {
        const room = props.rooms[key];
        return renderRoomListItem(props, room);
      }) }
    </div>
  );
};

const ChatJoin = props =>
  <div className="chat-join">
    <Login {...props} />
    { renderRoomListContainer(props) }
  </div>;

ChatJoin.defaultProps = {
  className: 'chat-rpg-login',
  label: 'Room Id',
  buttonText: 'Create Room',
  autoFocus: false,
  inputValue: '',
  rooms: {},
  onSubmit,
};

ChatJoin.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  user: PropTypes.object,
  userLogin: PropTypes.func,
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rooms: PropTypes.object,
};

const connectedChatJoin = withRouter(connect(state => ({
  userName: state.user.name,
  userCharacter: state.character,
  rooms: state.chatRPG.availableRooms.rooms,
  players: state.chatRPG.players.available,
}), {
  selectRoom,
  leaveRoom,
  getRooms,
  getPlayers,
})(ChatJoin));

export default connectedChatJoin;

