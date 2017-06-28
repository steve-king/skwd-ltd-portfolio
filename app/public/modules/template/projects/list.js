import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Header from 'modules/header';
import { HexButton, IconButton } from 'modules/button';

class ProjectList extends React.Component {
  render() { 
    const { data, dataLoaded, dataRendered, routeWillChange, hiddenMobile, location } = this.props;
    const classes = [
      'flex__item',
      'flex--v',
      'project__list',
      hiddenMobile ? 'hiddenMobile' : '',
      !dataLoaded ? 'noLoaded' : '',
      !dataRendered ? 'loading' : '',
      routeWillChange ? 'leaving' : '',
    ];
    return(
      <section className={classNames(classes)}>
        <Header 
          href="/"
          button={<IconButton className="header__btn" action="/" text="back" icon="hexLogo" direction="left" />}
          position="left"
          hideTitleDesktop
          hideButtonDesktop>
          <span>Projects</span>
        </Header>
        <div className="flex__item flex--h grid--padding">
          {data.projects &&
            <nav className="nav project__list__nav">
              {data.projects.map((project, i) => (
                <HexButton key={i} className="nav__btn"
                  action={`/projects/${project.slug}`}
                  text={project.title}
                  active={location.pathname.includes(project.slug)}  
                  large />
              ))}
            </nav>
          }
        </div>
      </section>
    );
  }
}

export default withRouter(ProjectList);
