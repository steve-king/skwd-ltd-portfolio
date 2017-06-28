import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Viewport from 'modules/viewport';
import Resource from 'modules/api-resource';

import Home from 'modules/template/home';
import About from 'modules/template/about';
import Projects from 'modules/template/projects';

import { pathSegment } from 'modules/helpers';

let firstRender = true;

const App = ({location}) => {
  let wait = 2000;
  if (!firstRender) {
    wait = 2000;
  }
  firstRender = false;
  return (
    <Viewport>
      <Route render={({location}) =>
        <CSSTransitionGroup
          transitionName="page"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1600}>
          {
            // Switch key - needed for CSSTransitions to track children
            // - sync with url change on segment 1 only
            // - This will prevent transitions reoccuring on sub route changes, 
            //   e.g /projects to /projects/:slug
          }
          <Switch key={pathSegment(location.pathname, 1)} location={location}>
            <Route exact path="/" render={props =>
              <Home 
                resourceUrl="/api/pages/home" 
                transition="transition--scale" 
                wait={2000} 
                {...props} />
            } />
            <Route exact path="/about" render={props =>
              <About 
                resourceUrl="/api/pages/about" 
                transition="transition--slideBottom" 
                wait={wait} 
                {...props} />
            } />
            <Route path="/projects" render={props =>
              <Projects 
                resourceUrl="/api/projects/" 
                transition="transition--slideRight" 
                wait={wait} 
                {...props} />
            } />
          </Switch>
        </CSSTransitionGroup>
      } />
    </Viewport>
  );
};

export default withRouter(App);
