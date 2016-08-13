import React from 'react';  // eslint-disable-line no-unused-vars
import './About.less';
import img from '../../../../shared/images/purple_dreams/purple_dream_logo.png';
import resume from '../../../../shared/info/resume.json';

const About = () => (
  <div className="about">
    <div className="about-info">
      <p>Just Me: {resume.name}</p>
      <p>
        What I do. Front End Dev:
        <a href={`http://${resume.social.github}`} target="_blank">My GitHub</a>
      </p>
      <p>
        Follow:
        <a href={`http://twitter.com/${resume.social.twitter}`} target="_blank">
          {resume.social.twitter}
        </a>
      </p>
      <p>
        Web:
        <a href={`http://${resume.social.site}`} target="_blank">
          {resume.social.site}
        </a>
      </p>
      <p>
        LinkedIn:
        <a href={`http://${resume.social.linkedin}`} target="_blank">
          Check out the references.
        </a>
      </p>
    </div>
    <img
      className="purple-dream-logo"
      src={img} />
  </div>
);


export default About;
