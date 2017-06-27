import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Gradient from 'modules/gradient';
import ButtonTab from 'modules/button-tab';
import { IconButton, HexButton } from 'modules/button';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

import withResource from 'modules/resource';


class About extends React.Component {
  render() {
    const { content, loaded } = this.props;
    const classes = [
      'about', 
      'grid--fill', 
      !loaded ? 'loading' : '',
      'transition--slideBottom'
    ];
    return (
      <div className={classNames(classes)}>
        <Gradient name="blueToPink" />
        <Hexagons ready={true} />
        {/*<div className="grid--col">*/}
          <ButtonTab position="top" action="/" text="back" icon="hexLogo" direction="up" />
          <main className="about__main grid--container">
              {loaded &&
                <div className="about__content">
                  <div>
                    <h1 className="title">{content.title}</h1>
                    {content.body}
                  </div>
                </div>
              }
              <nav className="about__nav">
                <HexButton className="about__btn" action="/projects" large text="Projects" />
                {/*<HexButton className="about__btn" action="/" large text="Projects" direction="down" />*/}
              </nav>
          </main>
        {/*</div>*/}
      </div>
    );
  }
};

export default withResource(About);
