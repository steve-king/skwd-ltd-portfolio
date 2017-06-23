import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

import Viewport from 'modules/viewport';
import Gradient from 'modules/gradient';
import * as actions from 'modules/template/actions';
import Template from 'modules/template';

import HomeTemplate from 'modules/template/home';
import AboutTemplate from 'modules/template/about';
import ProjectTemplate from 'modules/template/project';

const App = (props) => {
  return (
    <Viewport>
      <Gradient name={gradient(props.location.pathname)} />
        <Switch>
          <Route exact path="/" render={() =>
            <Template Component={HomeTemplate} apiUrl="/api/pages/home" />
          } />
          <Route exact path="/about" render={() =>
            <Template Component={AboutTemplate} apiUrl="/api/pages/about" />
          } />
          <Route path="/projects" render={() =>
            <Template Component={ProjectTemplate} apiUrl="/api/pages/projects" />
          } />
        </Switch>
    </Viewport>
  );
};

export default withRouter(App);

function gradient(path) {
  switch (path) {
    case '/': return 'none';
    case '/about': return 'blueToPink';
    case '/projects': return 'yellowToBlue';
  }
}
