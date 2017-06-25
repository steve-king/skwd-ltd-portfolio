import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Header from 'modules/header';
import Button from 'modules/button';

class ProjectList extends React.Component {
  render() { 
    const { content, loaded, hiddenMobile, subtemplate } = this.props;
    const classes = [
      'template', 
      'template--project-list',
      subtemplate  ? 'template--subtemplate' : '',
      hiddenMobile ? 'hiddenMobile' : '',
      !loaded ? 'loading' : ''
    ];
    return(
      <div className={classNames(classes)}>
        <Header 
          href="/"
          button={<Button type="hexLogo" icon="chevron" direction="left" />}
          position="left"
          hideTitleDesktop>
          <span>Projects</span>
        </Header>
        <main className="template--projects__main">
          {loaded && content.projects &&
            <nav className={classNames('template--projects__nav')}>
              {content.projects.map((project, i) => (
                <Link key={i} to={`/projects/${project.slug}`} className="template--projects__nav__btn">
                  <Button type="hexFill" colour="white" size="xl" text={project.title} icon="chevron" direction="right" />
                </Link>
              ))}
            </nav>
          }
        </main>
      </div>
    );
  }
}

export default ProjectList;
