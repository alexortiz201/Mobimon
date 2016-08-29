import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import createChatRoom from './ChatRoom';
import './ChatRoom.less';

// const deps = [React];


const ChatRoom = createChatRoom(React);

ChatRoom.defaultProps = {
  userName: '',
  userCharacter: {},
};

ChatRoom.propTypes = {
  userName: PropTypes.string.isRequired,
  userCharacter: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

const connectedChatRoom = connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
}), {})(ChatRoom);

export default connectedChatRoom;
