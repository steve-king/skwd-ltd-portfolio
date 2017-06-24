import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export default function withData(Template){
  class TemplateContainer extends React.Component {
    componentDidMount = () => this.props.getData()
    // componentWillUnmount = () => this.props.resetData()
    render () {
      const { data, children } = this.props;
      return (
        <Template {...data} children={children} />
      );
    }
  }

  return connect(
    state => ({
      data: state.pageData
    }),
    (dispatch, ownProps) => ({
      getData: () => dispatch(actions.fetchData(ownProps.dataType, ownProps.apiUrl)),
      resetData: () => dispatch(actions.resetData(ownProps.dataType)),
    })
  )
  (TemplateContainer);
};
