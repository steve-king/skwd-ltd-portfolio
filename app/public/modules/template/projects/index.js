import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import withData from 'modules/template';
import Project from 'modules/template/project';
import Button from 'modules/button';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

const projectRender = (props) => {
  console.log(props);
  return(<Project dataType="project" apiUrl={'/api/projects/' + props.match.params.slug} />);
}

class Projects extends React.Component {
  render() { 
    const { content, loaded, children } = this.props;
    return(
      <div className={classNames('template template--projects', !loaded ? 'loading' : '')}>
        {loaded && <Gradient name="yellowToBlue" /> }
        <Hexagons ready={loaded} />
        <Header 
          href="/"
          button={<Button type="hexLogo" icon="chevron" direction="left" />}
          title="Projects" 
          position="left"
        >
        </Header>
        <main className="template--projects__main">
          {loaded && content.projects &&
            <div className="grid-container">
              <nav className="template--projects__nav">
                {content.projects.map((project, i) => (
                  <Link key={i} to={`/projects/${project.slug}`} className="template--projects__nav__btn">
                    <Button type="hexFill" colour="white" size="xl" text={project.title} icon="chevron" direction="right" />
                  </Link>
                ))}
              </nav>
              <Route path="/projects/:slug" render={projectRender} />
            </div>
          }
        </main>
      </div>
    );
  }
}

export default withData(Projects);
