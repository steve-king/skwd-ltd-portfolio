import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

import Viewport from 'modules/viewport';
import * as actions from 'modules/template/actions';
import Template from 'modules/template';

import Home from 'modules/template/home';
import About from 'modules/template/about';
import Projects from 'modules/template/projects';
import Project from 'modules/template/project';

const App = (props) => {
  return (
    <Viewport>
      <Switch>
        <Route exact path="/" render={() =>
          <Home dataType="page" apiUrl="/api/pages/home" />
        } />
        <Route exact path="/about" render={() =>
          <About dataType="page" apiUrl="/api/pages/about" />
        } />
        <Route path="/projects" render={() =>
          <Projects dataType="page" apiUrl="/api/projects">
            <Route path="projects/:slug" render={props =>  
              <Project dataType="project" apiUrl={'/api/projects/' + props.match.params.slug} />
            } />
          </Projects>
        } />
      </Switch>
    </Viewport>
  );
};

export default withRouter(App);
