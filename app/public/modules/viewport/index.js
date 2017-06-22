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
      <div className="viewport" style={{ height: viewport.height || 'auto' }}>
        {children}
      </div>
    );
  }
}

export default connect(state => ({
  viewport: state.viewport
}))(Viewport);
