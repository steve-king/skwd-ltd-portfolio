import React from 'react';

const About = ({ content }) => (
  <div className="page page--about">
    {content &&
      <div className="page__content">
        <h1>{content.title}</h1>
        <p>{content.body}</p>
      </div>
    }
  </div>
);

export default About;
