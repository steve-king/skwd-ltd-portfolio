import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export default function TemplateWrapper(Template){
  class TemplateContainer extends React.Component {
    componentDidMount = () => this.props.getData()
    componentWillUnmount = () => this.props.resetData()
    render () {
      const { apiUrl,templateData } = this.props;
      return (
        <Template {...templateData} apiUrl={templateData.apiUrl} />
      );
    }
  }

  return connect(
    state => ({
      templateData: state.templateData
    }),
    (dispatch, ownProps) => ({
      getData: () => dispatch(actions.fetchData(ownProps.apiUrl)),
      resetData: () => dispatch(actions.resetData()),
    })
  )
  (TemplateContainer);
};
