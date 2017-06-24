import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

import Viewport from 'modules/viewport';
import * as actions from 'modules/template/actions';
import Template from 'modules/template';

import Home from 'modules/template/home';
import About from 'modules/template/about';
import Project from 'modules/template/project';

const App = (props) => {
  return (
    <Viewport>
      <Switch>
        <Route exact path="/" render={() =>
          <Home apiUrl="/api/pages/home" />
        } />
        <Route exact path="/about" render={() =>
          <About apiUrl="/api/pages/about" />
        } />
        <Route exact path="/projects" render={() =>
          <Project apiUrl="/api/projects" />
        } />
      </Switch>
    </Viewport>
  );
};

export default withRouter(App);
