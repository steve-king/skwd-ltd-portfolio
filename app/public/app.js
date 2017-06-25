import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

import Viewport from 'modules/viewport';

import Resource from 'modules/api-resource';
import Home from 'modules/template/home';
import About from 'modules/template/about';
import Projects from 'modules/template/projects';
import Project from 'modules/template/project';

const App = (props) => {
  return (
    <Viewport>
      <Switch>
        <Route exact path="/" component={props =>
          <Resource type="page" url="/api/pages/home" {...props}>
            <Home />
          </Resource>
        } />
        <Route exact path="/about" component={props =>
          <Resource type="page" url="/api/pages/about" {...props}>
            <About />
          </Resource>
        } />
        <Route path="/projects" component={Projects} />
      </Switch>
    </Viewport>
  );
};

export default withRouter(App);
