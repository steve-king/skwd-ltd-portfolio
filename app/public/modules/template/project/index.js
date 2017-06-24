import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import withData from 'modules/template';

import Button from 'modules/button';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';
import Header from 'modules/header';

class Project extends React.Component {
  render() { 
    const { content, loaded, children } = this.props;
    return(
      <div className={classNames('template template--project', !loaded ? 'loading' : '')}>
        <Header 
          href="/projects"
          button={<Button type="hexLogo" icon="chevron" direction="left" />}
          title={content.title} 
          position="left"
        >
        </Header>
        <main className="template--project__main">
          {loaded && 
            <p>{content.body}</p>
          }
        </main>
      </div>
    );
  }
}

export default withData(Project);
