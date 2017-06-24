import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import template from 'modules/template';

import Button from 'modules/button';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

class Project extends React.Component {
  render() { 
    const { data, loaded } = this.props;
    return(
      <div className={classNames('template template--project', !loaded ? 'loading' : '')}>
        {loaded && <Gradient name="yellowToBlue" /> }
        <Hexagons ready={loaded} />
        <Header className="left">
          <Link to="/" className="header__link--fill">
            <Button type="hexLogo" icon="chevron" direction="left" />
          </Link>
        </Header>
        <main className="template--project__main">
          <div className="grid-container">
            {loaded && data.projects &&
              <nav className="template--project__nav">
                
                {data.projects.map((project, i) => (
                  <Link key={i} to={`/projects/${project.slug}`} className="template--project__nav__btn">
                    <Button type="hexFill" colour="white" size="xl" text={project.title} icon="chevron" direction="right" />
                  </Link>
                ))}
              </nav>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default template(Project);
