import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Background from 'modules/background';
import ButtonTab from 'modules/button-tab';
import { IconButton, HexButton } from 'modules/button';
import Header from 'modules/header';

import withResource from 'modules/resource';
import { asHtml, withPTags } from 'modules/helpers';

class About extends React.Component {
  render() {
    const { data, dataRendered, routeWillChange } = this.props;
    return (
      <div className="about grid--fill flex">
        <Background 
          ready={dataRendered && !routeWillChange}
          hexagons blend="overlay" 
          gradient="blueToPink" />
          <ButtonTab position="top" action="/" text="back" icon="hexLogo" direction="up" />
          <main className="about__main scroll--v">
            <div className="grid--container">
              {dataRendered && 
                <div className="about__content">
                  <h1 className="title">{data.title}</h1>
                  <div className="body" dangerouslySetInnerHTML={asHtml(withPTags(data.body))} />
                  <nav className="nav about__nav">
                    <HexButton className="nav__btn nav__btn--small about__btn" action="https://drive.google.com/file/d/0BwUf9GoACLUMMlpYcEdTZTlCRVk/view" small text="CV" />
                    {/*<HexButton className="about__btn" action="/projects" small text="Projects" />*/}
                    <HexButton className="nav__btn nav__btn--small about__btn" action="https://github.com/steve-king" icon="github" />
                    <HexButton className="nav__btn nav__btn--small about__btn" action="mailto:mail@steveking.info" icon="email" />
                    <HexButton className="nav__btn nav__btn--small about__btn" action="https://www.linkedin.com/in/stevek1ng/" icon="linkedin" />
                  </nav>
                </div>
              }
              
            </div>
          </main>
      </div>
    );
  }
};

export default withResource(About);
