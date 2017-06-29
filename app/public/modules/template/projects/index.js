import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import Resource from 'modules/api-resource';
import Background from 'modules/background';
import Project from './project';
import List from './list';
import ButtonTab from 'modules/button-tab';

import withResource from 'modules/resource';

class Projects extends React.Component {
  render() { 
    const { match, location, dataRendered, routeWillChange } = this.props;
    return(
      <div className="project">
        <Background 
          ready={dataRendered && !routeWillChange}
          hexagons blend="overlay" 
          gradient="yellowToBlue" />
        <div className="grid--fill flex--h ">
          <ButtonTab hide="mobile" position="left" action="/" text="back" icon="hexLogo" direction="left" />
          <div className="flex__item flex--h">
            <Route path="/projects" render={props => 
              <List hiddenMobile={!match.isExact} {...this.props} />
            } />
            <Route key={location.key} path="/projects/:slug" render={props =>
              <Project resourceUrl={'/api/projects/' + props.match.params.slug} {...props} />
            } />
          </div>
        </div>  
      </div>
    );
  }
}

export default withResource(withRouter(Projects));