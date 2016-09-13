import React, { PropTypes } from 'react';
import createCharacter from '../../../../core/public/components/Character/';
import createSpeechBubble from './SpeechBubble.js';
import './SpeechBubble.less';

const SpeechBubble = createSpeechBubble(React);

// eslint-disable-next-line no-unused-vars
const Character = createCharacter(React);

const renderCharacter = character =>
  <Character character={character} />;

SpeechBubble.defaultProps = {
  character: {
    name: 'Anonamouse',
  },
  userName: '',
  message: 'Testing...',
  renderCharacter,
};

SpeechBubble.propTypes = {
  character: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  renderCharacter: PropTypes.func.isRequired,
};

export default SpeechBubble;
