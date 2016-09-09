// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { load } from '../../services/firebase/firebase.service';
import './ChatJoin.less';

import createLogin from '../../../../core/public/pages/Login/Login.js';
import { selectRoom } from '../../redux/session/session-actions';

load();

const ChatJoin = createLogin(React);

const onSubmit = (e, props, inputNode) => {
  e.preventDefault();
  const roomName = inputNode.value;
  const roomKey = roomName.toLowerCase().replace(/[^a-z0-9_]/g, '');

  if (roomKey) {
    // addBattle
    props.selectRoom({
      roomKey,
      roomName,
    });

    props.router.replace(`/chat-rpg/battle/${roomKey}`);
  }
};

// const ChatJoin = (props) =>
//   <div className="chat-join">
//     <form className="formJoinBattle" onSubmit={() => {}}>
//     <LabeledInput label="Enter a New Battle" ref="battleNameInput"/>
//     <input className="button" type="submit" value="Join" />
//     </form>
//     <div className="header-container">
//     <h3>Or Select a Battle to Join </h3>
//     </div>
//     <div className="collection">
//     {/*this._getBattleList()*/}
//     </div>
//   </div>;

ChatJoin.defaultProps = {
  className: 'chat-rpg-login',
  label: 'Room Id',
  buttonText: 'Log Into Room',
  autoFocus: false,
  inputValue: '',
  games: [],
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
  games: PropTypes.array,
};

const connectedChatJoin = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
  // games: state.chatRPG.games,
}), {
  selectRoom,
})(ChatJoin));

export default connectedChatJoin;

