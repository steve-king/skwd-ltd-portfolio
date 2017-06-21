import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

import Home from './templates/home';
import About from './templates/about';

class Page extends React.Component {

  componentDidMount() {
    const { apiUrl, dispatch } = this.props;
    if (apiUrl) {
      dispatch(actions.fetchContent(apiUrl));
    }
  }

  render(){
    const { page } = this.props;

    return (
      <Switch>
        <Route exact path="/" render={() => <Home {...page} />} />
        <Route path="/about" render={() => <About {...page} />} />
      </Switch>
    );
  }
}

export default connect(
  state => ({ page: state.page })
)(Page);
