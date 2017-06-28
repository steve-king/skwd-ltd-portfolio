import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

import Resource from 'modules/api-resource';
import Project from './project';
import List from './list';
import ButtonTab from 'modules/button-tab';

import Gradient from 'modules/gradient';
import Hexagons from 'modules/hexagons';

import withResource from 'modules/resource';


class Projects extends React.Component {
  render() { 
    const { match, location } = this.props;
    const classes = [
      'project',
      'transition--slideRight'   
    ];
    return(
      <div className={classNames('grid--fill project transition--slideRight')}>
        <Gradient name="yellowToBlue" />
        <Hexagons ready={true} />
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

// export default connect(
//   state => ({
//     loaded: state.page.loaded
//   })
// )(withRouter(Projects));

// export default withRouter(Projects);
// export default Projects;
export default withResource(withRouter(Projects));