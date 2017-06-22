import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

import Gradient from 'modules/gradient';

import Home from './templates/home';
import About from './templates/about';

class Page extends React.Component {

  getContent(url) {
    const { dispatch, apiUrl } = this.props;
    return dispatch(actions.fetchContent(apiUrl));
  }

  gradient(path){
    switch (path) {
      case '/': return 'yellowToBlue';
      case '/about': return 'blueToPink';
    }
  }

  render(){
    const { page, route, location } = this.props;
    return (
      <Gradient name={this.gradient(location.pathname)}>
        <Switch>
          <Route exact path="/" render={() =>
            <Home {...page} getContent={() => this.getContent()} />
          } />
          <Route path="/about" render={() =>
            <About {...page} getContent={() => this.getContent()} />
          } />
        </Switch>
      </Gradient>
    );
  }
}

export default connect(
  state => ({ page: state.page })
)(
  withRouter(Page)
);
