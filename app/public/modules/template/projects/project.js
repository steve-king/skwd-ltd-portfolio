import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import { IconButton } from 'modules/button';
import Header from 'modules/header';
import withResource from 'modules/resource';

class Project extends React.Component {
  render() { 
    const { data } = this.props;
    const classes = [
      'flex__item',
      'flex--v',
      'project__single', 
    ];
    return(
      <section className={classNames(classes)}>
        <Header 
          href="/projects"
          button={<IconButton className="header__btn" action="/projects" text="back" icon="hexLogo" direction="left" />}
          hideButtonDesktop>
          {data.title}
        </Header>
        <div className="flex__item grid--padding">
          <div className="project__content">
            {data.body}
          </div>
        </div>
      </section>
    );
  }
}

export default withResource(Project);
