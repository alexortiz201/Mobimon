import React from 'react'; // eslint-disable-line no-unused-vars

const aboutInfo = ({ name, social }) => (
  <div className="about-info">
    <h1 className="about-info-name">{name}</h1>
    <a className="about-info-link"
      href={`http://${social.github}`}
      target="_blank">{social.github}</a>
    {' • '}
    <a className="about-info-link"
      href={`http://${social.linkedin}`}
      target="_blank">{social.linkedin}</a>
    {' • '}
    <a className="about-info-link"
      href={`http://twitter.com/${social.twitter}`}
      target="_blank">{social.twitter}</a>
    {' • '}
    <a className="about-info-link"
      href={`http://${social.site}`}
      target="_blank">{social.site}</a>
  </div>
);

const successFn = (success, index) => (
  <li key={`${success}${index}`}>{`${success}\n`}</li>
);

const resumeExperience = ({ position, company, date, tech, successes }) => (
  <pre key={`${position}-${company}`}>
    <code className="about-experience">
      <span className="position">{`${position} `}</span>
      <span className="company">{`| ${company}\n`}</span>
      <span className="date">{`${date}\n`}</span>

      <h4>Tech:</h4>
      <span className="tech">
        {`[${tech.join(', ')}]`}
      </span>

      <h4>Successes:</h4>
      <span className="successes">
        <ul>
          {successes.map((success, index) => successFn(success, index))}
        </ul>
      </span>
    </code>
  </pre>
);

const resumeEducation = ({ school, location, degree }) => (
  <pre>
    <code className="about-education">
      <span className="school">{`${school}`}</span>
      <span className="location">{` | ${location} | `}</span>
      <span className="degree">{`${degree}`}</span>
    </code>
  </pre>
);

const aboutResume = ({ experience, education }) => (
  <div className="about-resume">
    <h3>Experience</h3>
    {experience.map(xp => resumeExperience(xp))}

    <h3>Education</h3>
    {resumeEducation(education)}
  </div>
);

const about = ({ resume, img }) => (
  <div className="about">
    { aboutInfo(resume) }
    { aboutResume(resume) }
    <img className="purple-dream-logo" src={img} />
  </div>
);

export default about;
