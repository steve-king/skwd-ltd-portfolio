import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Button from 'modules/button';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

class Project extends React.Component {
  componentDidMount = () => this.props.getData()
  render() {
    const { data, loaded } = this.props;
    return(
      <div className={classNames('template template--project', !loaded ? 'loading' : '')}>
        {/* <Hexagons ready={dataLoaded} /> */}
        <Header className="top">
          <Link to="/" className="header__link--fill">
            <Button type="hexLogo" icon="chevron" direction="up" />
          </Link>
        </Header>
        <main className="template__main template--about__main">
          <div className="grid-container">

            {loaded &&
              <nav className="projects__nav">
                {data.projects.map(project => (
                  <Link to={`/projects/${project.slug}`} className="projects__nav__btn">
                    <Button type="hexFill" text={$project.title} icon="chevron" direction="right" />
                  </Link>
                ))}
              </nav>
            }
          </div>
          {/* <nav className="nav">
            <Link to="/projects" className="nav__btn nav__btn--projects">
              <Button type="hexFill" text="Projects" icon="chevron" direction="right" />
            </Link>
          </nav> */}
        </main>
      </div>
    );
  }
}

export default Project;
