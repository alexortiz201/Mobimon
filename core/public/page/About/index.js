import React from 'react';
import './About.less';
import createAbout from './About.js';

import img from '../../../../shared/images/purple_dreams/purple_dream_logo.png';
import resume from '../../../../shared/info/resume.json';

const About = createAbout(React);
About.defaultProps = {
  img,
  resume,
};

export default About;
