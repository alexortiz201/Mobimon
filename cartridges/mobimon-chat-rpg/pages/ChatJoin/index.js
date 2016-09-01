// eslint-disable-next-line no-unused-vars
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

import './ChatJoin.less';

const ChatJoin = (props) =>
  <div className="chat-join">{props.games}</div>;

ChatJoin.defaultProps = {
  games: [],
};

ChatJoin.propTypes = {
  games: PropTypes.array,
};

const connectedChatJoin = withRouter(connect((state) => ({
  userName: state.user.name,
  userCharacter: state.character,
  // games: state.chatRPG.games,
}), {})(ChatJoin));

export default connectedChatJoin;
