import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Background from 'modules/background';
import ButtonTab from 'modules/button-tab';
import { IconButton, HexButton } from 'modules/button';
import Header from 'modules/header';

import withResource from 'modules/resource';

class About extends React.Component {
  render() {
    const { data, dataRendered, routeWillChange } = this.props;
    return (
      <div className="about grid--fill">
        <Background 
          ready={dataRendered && !routeWillChange}
          hexagons blend="overlay" 
          gradient="blueToPink" />
          <ButtonTab position="top" action="/" text="back" icon="hexLogo" direction="up" />
          <main className="about__main grid--container">
              <div className="about__content">
                <div>
                  <h1 className="title">{data.title}</h1>
                  {data.body}
                </div>
              </div>
              <nav className="about__nav">
                <HexButton className="about__btn" action="/projects" large text="Projects" />
              </nav>
          </main>
      </div>
    );
  }
};

export default withResource(About);
