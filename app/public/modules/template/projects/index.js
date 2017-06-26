import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import Resource from 'modules/api-resource';
import Project from './project';
import List from './list';

import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';

class Projects extends React.Component {
  render() { 
    const { match, loaded } = this.props;
    return(
      <div className={classNames('grid--fill project')}>
        <Gradient name="yellowToBlue" />
        <Hexagons ready={loaded} />
        <div className="grid--fill">
          <Route path="/projects" render={props => 
            <Resource type="page" url={'/api/projects/'}>
              <List hiddenMobile={!match.isExact} />
            </Resource>
          } />

          <Route path="/projects/:slug" component={props =>
            <Resource type="project" url={'/api/projects/' + props.match.params.slug}>
              <Project {...props} />
            </Resource>
          } />
        </div>
      </div>
    );
  }
}

export default connect(
  state => (Object.assign({}, state.page))
)(withRouter(Projects));
