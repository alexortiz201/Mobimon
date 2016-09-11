// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './ChatJoin.less';

import { load, init } from '../../services/firebase/firebase.service';
import createLogin from '../../../../core/public/pages/Login/Login.js';
import { selectRoom, getRooms } from '../../redux/session/session-actions';

import { COLORS } from '../../../../core/shared/other';

// eslint-disable-next-line no-unused-vars
const Login = createLogin(React);

const EXPIRE_TIMESTAMP = 300000; // 5 min , 60000 = 1 min
let roomTimeStamp = 0;

/**
 * Timestap for busting cached rooms every five min
 * @param  {int} expMin  expire amount milli
 * @return {bool}
 */
const timeStampExpBool = (expMin = EXPIRE_TIMESTAMP) => {
  const currTimeStamp = new Date(Date.now()).getTime();
  return expMin <= currTimeStamp - roomTimeStamp;
};

const handleSelection = (props, room) => {
  const name = room.name.toLowerCase().replace(/[^a-z0-9_]/g, '');
  const update = {};

  update[props.userName] = {
    color: COLORS[Math.floor(Math.random() * 4)],
  };

  // addBattle
  props.selectRoom({
    ...room,
    name,
  },
  update);

  props.router.replace(`/chat-rpg/battle/${room.key}`);
};

const onSubmit = (e, props, inputNode) => {
  e.preventDefault();
  const val = inputNode.value;
  handleSelection(props, { key: val, name: val });
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

const renderRoomListContainer = (props) => {
  if (!props.rooms.length || timeStampExpBool()) {
    setUpFireBaseScripts().then(() => {
      props.getRooms();
      roomTimeStamp = new Date(Date.now()).getTime();
    });

    return null;
  }

  return (
    <div className="game-list-container">
      <h3 className="game-list-header">Or Select a Battle to Join</h3>
      { props.rooms.map((room, index) => {
        room.key = index; // eslint-disable-line
        return renderRoomListItem(props, room);
      }) }
    </div>
  );
};

const ChatJoin = (props) =>
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
  rooms: [],
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
  rooms: PropTypes.array,
};

const connectedChatJoin = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
  rooms: state.chatRPG.availableRooms.rooms,
}), {
  selectRoom,
  getRooms,
})(ChatJoin));

export default connectedChatJoin;

