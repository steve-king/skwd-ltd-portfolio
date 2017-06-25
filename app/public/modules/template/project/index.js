import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import Button from 'modules/button';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

class Project extends React.Component {
  render() { 
    const { content, loaded, children, subtemplate } = this.props;
    const classes = [
      'template',
      subtemplate  ? 'template--subtemplate' : '', 
      'template--project', 
      !loaded ? 'loading' : ''
    ];
    return(
      <div className={classNames(classes)}>
          <Header 
            href="/projects"
            button={<Button type="hexLogo" icon="chevron" direction="left" />}
            hideButtonDesktop>
            <span>{loaded && content.title}</span>
          </Header>
        {loaded &&
          <main className="template--project__main">
            <p>{content.title}</p>
          </main>
        }
      </div>
    );
  }
}

export default Project;
