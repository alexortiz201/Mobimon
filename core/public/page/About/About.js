import React from 'react';  // eslint-disable-line no-unused-vars
import './About.less';
import template from './About.jsx';
import img from '../../../../shared/images/purple_dreams/purple_dream_logo.png';
import resume from '../../../../shared/info/resume.json';

const opts = { resume, img };
const About = () => template(opts);

export default About;
