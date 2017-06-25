import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import Resource from 'modules/api-resource';
import ProjectList from 'modules/template/project-list';
import Project from 'modules/template/project';
import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';

class Projects extends React.Component {
  render() { 
    const { content, match, location, loaded } = this.props;
    return(
      <div className={classNames('template template--projects')}>
        <Gradient name="yellowToBlue" />
        <Hexagons ready={loaded} />

        <Route path="/projects" render={props => 
          <Resource type="page" url={'/api/projects/'}>
            <ProjectList subtemplate="true" hiddenMobile={!match.isExact} />
          </Resource>
        } />

        <Route path="/projects/:slug" component={props =>
          <Resource type="project" url={'/api/projects/' + props.match.params.slug}>
            <Project subtemplate="true" {...props} />
          </Resource>
        } />
      </div>
    );
  }
}

export default connect(
  state => (Object.assign({}, state.page))
)(withRouter(Projects));
