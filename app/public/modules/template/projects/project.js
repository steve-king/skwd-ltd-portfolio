import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

// import Button from 'modules/button';
import { IconButton } from 'modules/button';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

import withResource from 'modules/resource';

class Project extends React.Component {
  render() { 
    const { content, loaded, children } = this.props;
    const classes = [
      'flex__item',
      'flex--v',
      'project__single', 
      !loaded ? 'loading' : ''
    ];
    return(
      <section className={classNames(classes)}>
        <Header 
          href="/projects"
          button={<IconButton className="header__btn" action="/projects" text="back" icon="hexLogo" direction="left" />}
          hideButtonDesktop>
          {loaded && content.title}
        </Header>
        <div className="flex__item grid--padding">
          {loaded &&
            <div className="project__content">
              {content.body}
            </div>
          }
        </div>
      </section>
    );
  }
}

export default withResource(Project);
