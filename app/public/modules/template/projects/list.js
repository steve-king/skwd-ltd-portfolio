import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Header from 'modules/header';
import { HexButton, IconButton } from 'modules/button-hex';

class ProjectList extends React.Component {
  render() { 
    const { content, loaded, hiddenMobile, location } = this.props;
    const classes = [
      'grid--col',
      'grid--row--desktop',
      'project__list',
      hiddenMobile ? 'hiddenMobile' : '',
      !loaded ? 'loading' : ''
    ];
    return(
      <section className={classNames(classes)}>
        <Header 
          href="/"
          button={<IconButton action="/" text="back" icon="hexLogo" direction="left" />}
          position="left"
          hideTitleDesktop>
          <span>Projects</span>
        </Header>
          {loaded && content.projects &&
            <nav className="grid--col grid--padding nav project__list__nav">
              {content.projects.map((project, i) => (
                <HexButton key={i} className="nav__btn"
                  action={`/projects/${project.slug}`}
                  text={project.title}
                  active={location.pathname.includes(project.slug)}  
                  large />
              ))}
            </nav>
          }
      </section>
    );
  }
}

export default withRouter(ProjectList);
