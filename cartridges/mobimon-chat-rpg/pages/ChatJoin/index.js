// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createSocketConnection } from '../../services/firebase/firebase.service';
import './ChatJoin.less';

import createLogin from '../../../../core/public/pages/Login/Login.js';
import { selectRoom, getRooms, setRooms } from '../../redux/session/session-actions';

// eslint-disable-next-line
let connectionRef;

// eslint-disable-next-line no-unused-vars
const Login = createLogin(React);

const handleSelection = (props, value) => {
  const roomName = value;
  const roomKey = roomName.toLowerCase().replace(/[^a-z0-9_]/g, '');

  if (!roomKey) {
    return;
  }

  // addBattle
  props.selectRoom({
    roomKey,
    roomName,
  });

  props.router.replace(`/chat-rpg/battle/${roomKey}`);
};

const onSubmit = (e, props, inputNode) => {
  e.preventDefault();
  handleSelection(props, inputNode.value);
};

const renderRoomListItem = (props, { name }) =>
  <button
    key={name}
    className={`button ${name}`}
    onClick={() => handleSelection(props, name)}>
    {name}
  </button>;

const renderRoomListContainer = (props) =>
  <div className="game-list-container">
    <h3 className="game-list-header">Or Select a Battle to Join</h3>
    { props.rooms.map(room => renderRoomListItem(props, room)) }
  </div>;

const ChatJoin = (props) => {
  connectionRef = createSocketConnection('games');
  connectionRef
    .once('value')
    .then((snapshot) => props.setRooms(snapshot.val()));

  return (
    <div className="chat-join">
      <Login {...props} />
      { props.rooms.length && renderRoomListContainer(props) }
    </div>
  );
};

ChatJoin.defaultProps = {
  className: 'chat-rpg-login',
  label: 'Room Id',
  buttonText: 'Log Into Room',
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
  rooms: state.chatRPG.availableRooms,
}), {
  selectRoom,
  getRooms,
  setRooms,
})(ChatJoin));

export default connectedChatJoin;

