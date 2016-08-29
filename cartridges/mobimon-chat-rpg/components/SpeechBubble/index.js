import React, { PropTypes } from 'react';
import createSpeechBubble from './SpeechBubble.js';
import './SpeechBubble.less';

const SpeechBubble = createSpeechBubble(React);

const renderCharacter = (character = {
  name: 'Anonamouse',
}) => <Character character={character} />;

SpeechBubble.defaultProps = {
  userName: '',
  message: '',
  renderCharacter,
};

SpeechBubble.propTypes = {
  userName: PropTypes.string.isRequired,
  renderCharacter: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  message: PropTypes.string,
};

export default SpeechBubble;
