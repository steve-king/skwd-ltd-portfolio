import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

class Viewport extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(actions.resizeListener());
    this.props.dispatch(actions.onResize());
  }

  render = () => {
    const { children, viewport, dispatch } = this.props;
    return (
      <div style={{ height: viewport.height || 'auto', display : 'block' }}>
        {children}
      </div>
    );
  }
}

export default connect(state => ({
  viewport: state.viewport
}))(Viewport);
