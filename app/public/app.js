import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

import Viewport from 'modules/viewport';

import Resource from 'modules/api-resource';
import Home from 'modules/template/home';
import About from 'modules/template/about';
import Projects from 'modules/template/projects';

import { CSSTransitionGroup } from 'react-transition-group';

const App = ({location}) => {
  return (
    <Viewport>
      <Route render={({location}) =>
        <CSSTransitionGroup
          transitionName="page"
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1500}>
          <Switch key={location.key} location={location}>
            <Route exact path="/" render={props =>
              <Home resourceUrl="/api/pages/home" />
            } />
            <Route exact path="/about" render={props =>
              <About resourceUrl="/api/pages/about" />
            } />
            <Route path="/projects" render={props =>
              <Projects resourceUrl="/api/projects/" />
            } />
          </Switch>

        </CSSTransitionGroup>
      } />
      
    </Viewport>
  );
};

export default withRouter(App);
