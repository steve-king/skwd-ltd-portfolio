import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

class Resource extends React.Component {
  componentDidMount = () => {
    setTimeout(() => this.props.getData(), 1000);
  }
  componentWillUnmount = () => this.props.resetData()
  render = () => React.cloneElement(this.props.children, this.props)
}

export default connect(
  (state, ownProps) => Object.assign({}, state[ownProps.type], ownProps),
  (dispatch, ownProps) => ({
    getData: (url) => dispatch(actions.fetchData(ownProps.type, url || ownProps.url)),
    resetData: () => dispatch(actions.resetData(ownProps.type)),
  })
)
(Resource);
