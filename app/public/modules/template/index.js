import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

const Template = ({ Component, templateData, getData, resetData }) => {
  return (<Component {...templateData} getData={getData} resetData={resetData} />);
}

export default connect(
  state => ({
    templateData: state.templateData
  }),
  (dispatch, ownProps) => ({
    getData: () => dispatch(actions.fetchData(ownProps.apiUrl)),
    resetData: () => dispatch(actions.resetData()),
  })
)
(Template);
