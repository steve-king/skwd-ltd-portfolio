import React from 'react';
import { Route, withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Viewport from 'modules/viewport';
import Gradient from 'modules/gradient';
import * as actions from 'modules/template/actions';
import Home from 'modules/template/home';
import About from 'modules/template/about';

const App = ({ location, dispatch, data }) => (
  <Viewport>
    <Gradient name={gradient(location.pathname)}>
      <Switch>
        <Route exact path="/" render={() =>
          <Home getData={() => getData('/api/pages/home', dispatch)} {...data} />} />
        <Route exact path="/about" render={() =>
          <About getData={() => getData('/api/pages/about', dispatch)} {...data} />} />
      </Switch>
    </Gradient>
  </Viewport>
);

export default withRouter(
  connect(state => ({
    data: state.templateData
  }))
  (App)
);


function gradient(path) {
  switch (path) {
    case '/': return 'yellowToBlue';
    case '/about': return 'blueToPink';
  }
}

function getData(url, dispatch) {
  return dispatch(actions.fetchData(url));
}
