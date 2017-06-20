import React from 'react';
import { Route } from 'react-router';
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

    if (!page.loaded) {
      return (<div>loading...</div>);
    }

    return (
      <div className="page">
        <Route exact path="/" render={() => <Home {...page} />} />
        <Route path="/about" render={() => <About {...page} />} />
      </div>
    );
  }
}

export default connect(
  state => ({ page: state.page })
)(Page);
