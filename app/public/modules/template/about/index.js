import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import template from 'modules/template';

import Gradient from 'modules/gradient';
import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

class About extends React.Component {
  render() {
    const { data, loaded } = this.props;
    return (
      <div className={classNames('template template--about', !loaded ? 'loading' : '')}>
        {loaded && <Gradient name="blueToPink" /> }
        <Hexagons ready={loaded} />
        <Header className="top">
          <Link to="/" className="header__link--fill">
            <Button type="hexLogo" icon="chevron" direction="up" />
          </Link>
        </Header>
        <main className="template__main template--about__main">
          {/*<div className="grid-container">*/}
            {loaded &&
              <div className="template--about__content">
                <div>
                  <h1 className="title">{data.title}</h1>
                  {data.body}
                </div>
              </div>
            }
            <nav className="template--about__nav">
              <Link to="/projects" className="template--about__nav__btn--projects">
                <Button type="hexFill" colour="white" size="xl" text="Projects" icon="chevron" direction="right" />
              </Link>
            </nav>
          {/*</div>*/}

        </main>
      </div>
    );
  }
};

export default template(About);
