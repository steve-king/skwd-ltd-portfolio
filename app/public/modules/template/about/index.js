import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Gradient from 'modules/gradient';
import ButtonTab from 'modules/button-tab';
import { IconButton, HexButton } from 'modules/button';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

const onClick = () => {
  console.log('hey');
}

class About extends React.Component {
  render() {
    const { content, loaded } = this.props;
    return (
      <div className={classNames('grid--fill', !loaded ? 'loading' : '')}>
        {loaded && <Gradient name="blueToPink" /> }
        <Hexagons ready={loaded} />
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
                {/*<HexButton className="about__btn" action={onClick} text="Projects" icon="icon--hex--logo" />*/}
              </nav>
          </main>
        {/*</div>*/}
      </div>
    );
  }
};

export default About;
